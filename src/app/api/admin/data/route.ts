import { NextResponse } from 'next/server';
import { CafeStoreData, initialCafeData } from '@/data/initialData';
import {
  isRedisConfigured,
  getCafeDataFromDb,
  saveCafeDataToDb,
  resetCafeDataInDb,
} from '@/lib/redis';

/**
 * Manipulates Turkish phone numbers for website display and click-to-call:
 * If input starts with 05 (or 5 or +905) and has 10 mobile digits:
 * Formats as: +90 5XX XXX XX XX (divided 3 3 2 2)
 * Example: 05344402028 -> +90 534 440 20 28
 * Raw: +905344402028
 */
export function formatTurkishPhone(input?: string): { phone: string; phoneRaw: string } {
  if (!input) return { phone: '', phoneRaw: '' };
  const digits = String(input).replace(/\D/g, '');
  if (!digits) return { phone: '', phoneRaw: '' };

  let std10 = '';
  if (digits.startsWith('05') && digits.length === 11) {
    std10 = digits.slice(1);
  } else if (digits.startsWith('905') && digits.length === 12) {
    std10 = digits.slice(2);
  } else if (digits.startsWith('5') && digits.length === 10) {
    std10 = digits;
  }

  if (std10.length === 10) {
    const p1 = std10.slice(0, 3);
    const p2 = std10.slice(3, 6);
    const p3 = std10.slice(6, 8);
    const p4 = std10.slice(8, 10);
    return {
      phone: `+90 ${p1} ${p2} ${p3} ${p4}`,
      phoneRaw: `+90${std10}`,
    };
  }

  return {
    phone: String(input).trim(),
    phoneRaw: digits ? `+${digits}` : '',
  };
}

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

    // Merge contact with phone manipulation (+90 3 3 2 2 format)
    let mergedContact = currentData.contact;
    if (body.contact) {
      mergedContact = { ...currentData.contact, ...body.contact };
      if (body.contact.phone !== undefined) {
        const formatted = formatTurkishPhone(body.contact.phone);
        mergedContact.phone = formatted.phone;
        mergedContact.phoneRaw = formatted.phoneRaw;
      }
      if (body.contact.phoneSecondary !== undefined) {
        const formattedSec = formatTurkishPhone(body.contact.phoneSecondary);
        mergedContact.phoneSecondary = formattedSec.phone;
        mergedContact.phoneSecondaryRaw = formattedSec.phoneRaw;
      }
    }

    // Merge incoming changes
    const updatedData: CafeStoreData = {
      ...currentData,
      ...(body.categories && Array.isArray(body.categories) ? { categories: body.categories } : {}),
      ...(body.gallery && Array.isArray(body.gallery) ? { gallery: body.gallery } : {}),
      ...(body.menu && Array.isArray(body.menu) ? { menu: body.menu } : {}),
      ...(body.hours && Array.isArray(body.hours) ? { hours: body.hours } : {}),
      ...(body.contact ? { contact: mergedContact } : {}),
      ...(body.socials ? { socials: { ...currentData.socials, ...body.socials } } : {}),
      ...(body.auth ? { auth: { ...currentData.auth, ...body.auth } } : {}),
      ...(body.heroVideo ? { heroVideo: { ...currentData.heroVideo, ...body.heroVideo } } : {}),
      ...(body.aboutImage !== undefined ? { aboutImage: body.aboutImage } : {}),
      ...(body.aboutSecondaryImage !== undefined ? { aboutSecondaryImage: body.aboutSecondaryImage } : {}),
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
