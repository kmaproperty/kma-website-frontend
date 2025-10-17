import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  transpilePackages: ['mui-one-time-password-input'],
  eslint: {
    ignoreDuringBuilds: true, // <-- skips ESLint on `next build`
  },
  typescript: {
    ignoreBuildErrors: true, // <-- skips TS errors on `next build`
  },
};

export default nextConfig;
