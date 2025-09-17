/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  // No remote image hosts are used. Tighten policy by removing wildcard allowance.
  images: {},
  experimental: {
    typedRoutes: true
  },
  webpack: (config) => {
    config.resolve.alias = {
      ...(config.resolve.alias || {}),
      '@': path.resolve(process.cwd()),
    };
    return config;
  }
};

export default nextConfig;
