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
        source: "/@:handle/dashboard",
        destination: "/u/:handle/dashboard",
      },
      {
        source: "/@:handle/settings",
        destination: "/u/:handle/settings",
      },
    ];
  },
};

module.exports = nextConfig;
