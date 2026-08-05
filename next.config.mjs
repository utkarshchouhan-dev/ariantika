/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,

  images: {
    formats: ["image/avif", "image/webp"],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 400, 480],
  },

  experimental: {
    optimizePackageImports: ["react-aria-components"],
  },
};

export default nextConfig;
