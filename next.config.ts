import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  allowedDevOrigins: [
    '10.25.102.136',
    '10.25.*',
    '10.*',
    '192.168.1.102',
    '192.168.1.*',
    '192.168.*',
  ],
  images: {
    // Serve AVIF first (best compression), fall back to WebP, then original
    formats: ['image/avif', 'image/webp'],
    // Qualities used by next/image optimizer for remote/uploaded images
    qualities: [75, 80, 85],
    // Cover all common viewport widths including mobile and 4K
    deviceSizes: [390, 640, 750, 828, 1080, 1200, 1920, 2560],
    imageSizes: [16, 32, 64, 96, 128, 256, 384],
    // Cache optimized images for 1 year (Vercel / CDN will respect this)
    minimumCacheTTL: 31536000,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'urfamenu.com',
      },
    ],
  },
  // Aggressive caching headers for all static assets
  async headers() {
    return [
      {
        // Cache all static files (JS, CSS, images, fonts) for 1 year
        // Next.js content-hashes these so they can be cached forever safely
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        // Cache public assets (WebP images, video poster) for 7 days
        source: '/:path((?!api/).*\\.(?:webp|jpg|png|svg|ico|woff2|woff))',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=604800, stale-while-revalidate=86400',
          },
        ],
      },
    ];
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
