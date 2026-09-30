import { NextResponse } from 'next/server';
import { CafeStoreData, initialCafeData } from '@/data/initialData';
import {
  isRedisConfigured,
  getCafeDataFromDb,
  saveCafeDataToDb,
  resetCafeDataInDb,
} from '@/lib/redis';

export async function GET() {
  try {
    if (isRedisConfigured) {
      const dbData = await getCafeDataFromDb();
      if (dbData) {
        return NextResponse.json({
          success: true,
          data: dbData,
          storage: 'upstash_redis',
        });
      }

      // If Redis is configured but empty, seed it with the initial default data
      await saveCafeDataToDb(initialCafeData);
      return NextResponse.json({
        success: true,
        data: initialCafeData,
        storage: 'upstash_redis',
      });
    }

    // Fallback if Redis credentials are not configured in environment
    return NextResponse.json({
      success: true,
      data: initialCafeData,
      storage: 'fallback_memory',
    });
  } catch (error) {
    console.error('Error fetching admin data from Upstash Redis:', error);
    return NextResponse.json(
      { success: false, error: 'Veri yüklenemedi' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Get current data from Upstash Redis or initial defaults
    let currentData: CafeStoreData = initialCafeData;
    if (isRedisConfigured) {
      const dbData = await getCafeDataFromDb();
      if (dbData) {
        currentData = dbData;
      }
    }

    // Merge incoming changes
    const updatedData: CafeStoreData = {
      ...currentData,
      ...(body.categories && Array.isArray(body.categories) ? { categories: body.categories } : {}),
      ...(body.gallery && Array.isArray(body.gallery) ? { gallery: body.gallery } : {}),
      ...(body.menu && Array.isArray(body.menu) ? { menu: body.menu } : {}),
      ...(body.hours && Array.isArray(body.hours) ? { hours: body.hours } : {}),
      ...(body.contact ? { contact: { ...currentData.contact, ...body.contact } } : {}),
      ...(body.socials ? { socials: { ...currentData.socials, ...body.socials } } : {}),
      ...(body.auth ? { auth: { ...currentData.auth, ...body.auth } } : {}),
      ...(body.heroVideo ? { heroVideo: { ...currentData.heroVideo, ...body.heroVideo } } : {}),
    };

    // Save directly to Upstash Redis
    if (isRedisConfigured) {
      await saveCafeDataToDb(updatedData);
    }

    return NextResponse.json({
      success: true,
      data: updatedData,
      storage: isRedisConfigured ? 'upstash_redis' : 'fallback_memory',
    });
  } catch (error) {
    console.error('Error saving admin data to Upstash Redis:', error);
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

    return NextResponse.json({
      success: true,
      data: initialCafeData,
      storage: isRedisConfigured ? 'upstash_redis' : 'fallback_memory',
    });
  } catch (error) {
    console.error('Error resetting admin data in Upstash Redis:', error);
    return NextResponse.json(
      { success: false, error: 'Sıfırlama başarısız oldu' },
      { status: 500 }
    );
  }
}
