import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Keep the frontend as a UI/BFF boundary. Canton credentials belong in the Java service.
};

export default nextConfig;
