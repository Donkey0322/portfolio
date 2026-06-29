import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  /**
   * Pin Next's file-tracing root to this project. There's a `yarn.lock` in
   * the developer's home directory which Next would otherwise pick up as the
   * workspace root and warn about.
   */
  outputFileTracingRoot: __dirname,
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
