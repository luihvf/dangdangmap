/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  transpilePackages: ['maplibre-gl'],
}
module.exports = nextConfig
