/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
  async rewrites() {
    return [
      {
        source: "/@:handle",
        destination: "/u/:handle",
      },
      {
        source: "/@:handle/:path*",
        destination: "/u/:handle/:path*",
      },
    ];
  },
};

module.exports = nextConfig;
