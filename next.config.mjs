/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["framer-motion", "lodash"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  webpack: (config) => {
    /**
     * `react-pdf` ships an optional `canvas` dep that is only used in Node.
     * In the browser bundle we alias it to `false` so webpack doesn't try
     * to resolve it.
     */
    config.resolve.alias.canvas = false;
    return config;
  },
};

export default nextConfig;
