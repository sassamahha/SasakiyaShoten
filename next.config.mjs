/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: {
    serverActions: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "m.media-amazon.com"
      }
    ]
  },
  eslint: {
    ignoreDuringBuilds: true
  }
};

export default nextConfig;
