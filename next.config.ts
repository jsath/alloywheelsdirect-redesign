import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/alloywheelsdirect-redesign',
  assetPrefix: '/alloywheelsdirect-redesign',
  images: {
    unoptimized: true
  }
};

export default nextConfig;
