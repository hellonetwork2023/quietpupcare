import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'amaz.quietpupcare.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '**.gravatar.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp'],
    minimumCacheTTL: 31536000,
    
  },
  // Replace Next.js built-in polyfill-module with an empty file.
  // Modern browsers (Chrome 109+, Safari 16+, etc.) already support
  // Array.prototype.at, flat, flatMap, Object.fromEntries, Object.hasOwn,
  // String.prototype.trimStart/trimEnd natively.
  // This eliminates ~14 KiB of unnecessary legacy JavaScript.
  turbopack: {
    resolveAlias: {
      '../build/polyfills/polyfill-module': './src/lib/empty-polyfill.js',
    },
  },
};

export default nextConfig;
