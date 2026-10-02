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
    const isServerless = Boolean(
      process.env.VERCEL ||
      process.env.AWS_LAMBDA_FUNCTION_NAME ||
      process.env.NODE_ENV === 'production'
    );

    // Look for Vercel Blob token across standard and custom store env names
    const blobToken =
      process.env.BLOB_READ_WRITE_TOKEN ||
      process.env.VERCEL_BLOB_READ_WRITE_TOKEN ||
      Object.entries(process.env).find(([k]) => k.endsWith('_READ_WRITE_TOKEN'))?.[1];

    // ── 1. Vercel Blob (Primary Production Storage) ─────────────────
    if (blobToken) {
      try {
        const blob = await put(`botaniqa/${cleanFileName}`, file, {
          access: 'public',
          token: blobToken,
        });
        return NextResponse.json({
          success: true,
          url: blob.url,
          storage: 'vercel_blob',
        });
      } catch (blobError) {
        console.warn('Vercel Blob upload failed:', blobError);
        // If Blob failed in serverless, try Base64 for images below
      }
    }

    // ── 2. Serverless Base64 Fallback (When Blob is unconfigured/offline) ──
    if (isServerless) {
      // For images under 3MB, encode as Data URL so admin uploads never crash with EROFS
      if (isImage && file.size <= 3 * 1024 * 1024) {
        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);
        const base64 = buffer.toString('base64');
        const dataUrl = `data:${file.type || 'image/webp'};base64,${base64}`;

        return NextResponse.json({
          success: true,
          url: dataUrl,
          storage: 'base64_data_url',
          note: 'Fotoğraf kaydedildi. Kalıcı CDN depolaması için Vercel Dashboard Environment Variables bölümüne BLOB_READ_WRITE_TOKEN ekleyebilirsiniz.',
        });
      }

      // If video or large file without Blob token on Vercel
      return NextResponse.json(
        {
          success: false,
          error:
            'Canlı ortamda (Vercel) dosya yüklemek için BLOB_READ_WRITE_TOKEN ortam değişkeni gereklidir. Lütfen Vercel Dashboard -> Settings -> Environment Variables bölümünden BLOB_READ_WRITE_TOKEN değerini ekleyin.',
        },
        { status: 500 }
      );
    }

    // ── 3. Local Disk Storage (Local Development only) ──────────────
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
