/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Static export for GitHub Pages (sonalanand102.github.io).
  output: "export",
  // GitHub Pages has no image-optimization server, so serve images as-is.
  images: { unoptimized: true },
};

export default nextConfig;
