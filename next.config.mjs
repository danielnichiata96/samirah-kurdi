/** @type {import('next').NextConfig} */
import path from 'path';

const nextConfig = {
  reactStrictMode: true,
  // No remote image hosts are used. Tighten policy by removing wildcard allowance.
  images: {},
  // Disable vendor chunk optimization imports that are causing missing chunk errors in dev
  // (notably for react-icons). This prevents Next from generating and trying to load
  // './vendor-chunks/react-icons.js' on the server runtime.
  optimizePackageImports: [],
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
