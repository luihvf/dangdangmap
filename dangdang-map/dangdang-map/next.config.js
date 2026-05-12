/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: process.env.NODE_ENV === 'production' ? '/' + (process.env.REPO_NAME || 'dangdang-map') : '',
  assetPrefix: process.env.NODE_ENV === 'production' ? '/' + (process.env.REPO_NAME || 'dangdang-map') + '/' : '',
  images: { unoptimized: true },
  transpilePackages: ['maplibre-gl'],
}
module.exports = nextConfig
