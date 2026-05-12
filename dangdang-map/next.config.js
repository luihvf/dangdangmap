/** @type {import('next').NextConfig} */
const isGithubPages = process.env.GITHUB_ACTIONS === 'true';
const repoName = process.env.REPO_NAME || '';

const nextConfig = {
  output: 'export',
  basePath: isGithubPages && repoName ? '/' + repoName : '',
  assetPrefix: isGithubPages && repoName ? '/' + repoName + '/' : '',
  images: { unoptimized: true },
  transpilePackages: ['maplibre-gl'],
}
module.exports = nextConfig
