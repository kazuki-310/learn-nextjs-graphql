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
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

export default nextConfig;
