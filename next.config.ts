import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['mui-one-time-password-input'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "kma-property.s3.ap-south-1.amazonaws.com",
        pathname: '**'
      },
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
