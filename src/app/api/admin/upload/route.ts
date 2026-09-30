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
    const imageMimeTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/svg+xml'];
    const videoMimeTypes = ['video/mp4', 'video/webm', 'video/quicktime', 'video/ogg'];
    const isImage = imageMimeTypes.includes(file.type);
    const isVideo = videoMimeTypes.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { success: false, error: 'Yalnızca resim (JPG, PNG, WEBP) veya video (MP4, WEBM, MOV) dosyaları yüklenebilir.' },
        { status: 400 }
      );
    }

    // Size limit: 15MB for images, 60MB for videos
    const maxSize = isVideo ? 60 * 1024 * 1024 : 15 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json(
        { success: false, error: `Dosya boyutu en fazla ${isVideo ? '60MB' : '15MB'} olabilir.` },
        { status: 400 }
      );
    }

    const cleanFileName = `${Date.now()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, '_')}`;

    // ── 1. Vercel Blob (Production) ─────────────────────────────────
    if (process.env.BLOB_READ_WRITE_TOKEN) {
      try {
        const blob = await put(`botaniqa/${cleanFileName}`, file, {
          access: 'public',
        });
        return NextResponse.json({
          success: true,
          url: blob.url,
          storage: 'vercel_blob',
        });
      } catch (blobError) {
        console.warn('Vercel Blob upload failed (store might be set to Private). Falling back to local storage:', blobError);
      }
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
