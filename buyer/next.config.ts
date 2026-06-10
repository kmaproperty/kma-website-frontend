import type { NextConfig } from "next";

const API_URL = process.env.BACKEND_URL || "http://localhost:3000";

const nextConfig: NextConfig = {
  /* config options here */
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  async rewrites() {
    return [
      {
        source: "/api/backend/:path*",
        destination: `${API_URL}/:path*`,
      },
      {
        source: '/api/zoho-crm',
        destination: 'https://flow.zoho.in/60051516575/flow/webhook/incoming?zapikey=1001.44351b4f025b3ec8dc799cf4a8613a9e.57d0e5fba173f65c6e3fcb9c136ce771&isdebug=false',
      },
    ];
  },
  reactStrictMode: false,
  transpilePackages: ['mui-one-time-password-input'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        hostname: "kma-property.s3.ap-south-1.amazonaws.com",
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '**'
      },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '**'
      }
    ]
  },
   turbopack: {
      rules: {
        '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.tsx',
      },
      },
    },
};

export default nextConfig;
