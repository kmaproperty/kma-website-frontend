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
