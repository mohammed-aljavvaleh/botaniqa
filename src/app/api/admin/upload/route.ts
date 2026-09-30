import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { put } from '@vercel/blob';

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json(
        { success: false, error: 'Dosya seçilmedi.' },
        { status: 400 }
      );
    }

    // Validate mime type
    const validMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
    if (!validMimeTypes.includes(file.type)) {
      return NextResponse.json(
        { success: false, error: 'Yalnızca resim dosyaları (JPG, PNG, WEBP, AVIF) yüklenebilir.' },
        { status: 400 }
      );
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'Dosya boyutu en fazla 10MB olabilir.' },
        { status: 400 }
      );
    }

    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    // ── 1. Vercel Blob (Production) ─────────────────────────────────
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      const blob = await put(`botaniqa/${cleanFileName}`, file, {
        access: 'public',
      });
      return NextResponse.json({
        success: true,
        url: blob.url,
        storage: 'vercel_blob',
      });
    }

    // ── 2. Local Fallback (Development) ─────────────────────────────
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
    await fs.mkdir(uploadsDir, { recursive: true });

    const filePath = path.join(uploadsDir, cleanFileName);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      url: `/uploads/${cleanFileName}`,
      storage: 'local_file',
    });
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { success: false, error: 'Fotoğraf yüklenirken bir hata oluştu.' },
      { status: 500 }
    );
  }
}
