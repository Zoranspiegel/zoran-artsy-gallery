import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'd32dm0rphc51dk.cloudfront.net',
        pathname: '/**'
      }
    ]
  }
};

export default nextConfig;
