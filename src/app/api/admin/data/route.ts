import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { CafeStoreData, initialCafeData } from '@/data/initialData';
import {
  isRedisConfigured,
  getCafeDataFromDb,
  saveCafeDataToDb,
  resetCafeDataInDb,
} from '@/lib/redis';

const DATA_FILE_PATH = path.join(process.cwd(), 'data', 'cafe-data.json');

async function getLocalStoredData(): Promise<CafeStoreData> {
  try {
    const fileContent = await fs.readFile(DATA_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(fileContent);
    return {
      ...initialCafeData,
      ...parsed,
      categories: parsed.categories && parsed.categories.length > 0 ? parsed.categories : initialCafeData.categories,
      contact: { ...initialCafeData.contact, ...(parsed.contact || {}) },
      socials: { ...initialCafeData.socials, ...(parsed.socials || {}) },
      auth: { ...initialCafeData.auth, ...(parsed.auth || {}) },
    };
  } catch {
    return initialCafeData;
  }
}

async function saveLocalData(data: CafeStoreData): Promise<void> {
  try {
    const dataDir = path.dirname(DATA_FILE_PATH);
    await fs.mkdir(dataDir, { recursive: true });
    await fs.writeFile(DATA_FILE_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.warn('Could not write to local file (e.g. read-only filesystem on Vercel):', error);
  }
}

export async function GET() {
  try {
    // 1. Check Upstash Redis first if configured
    if (isRedisConfigured) {
      const dbData = await getCafeDataFromDb();
      if (dbData) {
        return NextResponse.json({
          success: true,
          data: dbData,
          storage: 'upstash_redis',
        });
      }
    }

    // 2. Fall back to local file / default
    const localData = await getLocalStoredData();

    // If redis is configured but empty, seed it with the current data
    if (isRedisConfigured) {
      await saveCafeDataToDb(localData);
    }

    return NextResponse.json({
      success: true,
      data: localData,
      storage: isRedisConfigured ? 'upstash_redis' : 'local_file',
    });
  } catch (error) {
    console.error('Error fetching admin data:', error);
    return NextResponse.json(
      { success: false, error: 'Veri yüklenemedi' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get current data
    let currentData: CafeStoreData;
    if (isRedisConfigured) {
      const dbData = await getCafeDataFromDb();
      currentData = dbData || (await getLocalStoredData());
    } else {
      currentData = await getLocalStoredData();
    }

    // Merge incoming changes (including categories and gallery)
    const updatedData: CafeStoreData = {
      ...currentData,
      ...(body.categories && Array.isArray(body.categories) ? { categories: body.categories } : {}),
      ...(body.gallery && Array.isArray(body.gallery) ? { gallery: body.gallery } : {}),
      ...(body.menu && Array.isArray(body.menu) ? { menu: body.menu } : {}),
      ...(body.hours && Array.isArray(body.hours) ? { hours: body.hours } : {}),
      ...(body.contact ? { contact: { ...currentData.contact, ...body.contact } } : {}),
      ...(body.socials ? { socials: { ...currentData.socials, ...body.socials } } : {}),
      ...(body.auth ? { auth: { ...currentData.auth, ...body.auth } } : {}),
    };

    // 1. Save to Upstash Redis if configured
    if (isRedisConfigured) {
      await saveCafeDataToDb(updatedData);
    }

    // 2. Also try writing to local file
    await saveLocalData(updatedData);

    return NextResponse.json({
      success: true,
      data: updatedData,
      storage: isRedisConfigured ? 'upstash_redis' : 'local_file',
    });
  } catch (error) {
    console.error('Error saving admin data:', error);
    return NextResponse.json(
      { success: false, error: 'Veriler kaydedilemedi' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    if (isRedisConfigured) {
      await resetCafeDataInDb();
    }
    await saveLocalData(initialCafeData);

    return NextResponse.json({
      success: true,
      data: initialCafeData,
      storage: isRedisConfigured ? 'upstash_redis' : 'local_file',
    });
  } catch (error) {
    console.error('Error resetting admin data:', error);
    return NextResponse.json(
      { success: false, error: 'Sıfırlama başarısız oldu' },
      { status: 500 }
    );
  }
}
