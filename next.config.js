/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: [],
  },
  async redirects() {
    return [
      {
        source: '/calculator',
        destination: '/calculators',
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
