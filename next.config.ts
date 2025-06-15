import type { NextConfig } from 'next';

async function redirects() {
  return [
    {
      source: '/',
      destination: '/dashboard',
      permanent: false,
    },
  ];
}

const nextConfig: NextConfig = {
  redirects,
  output: 'standalone',
};

export default nextConfig;
