import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  devIndicators: {
    position: 'bottom-right',
  },
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
}

export default nextConfig
