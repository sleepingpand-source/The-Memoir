import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async rewrites() {
    return [
      {
        source: '/uploads/:filename*',
        destination: '/api/media/:filename*',
      },
    ];
  },
};

export default nextConfig;
