/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  regions: ['yul1'], // Montreal, Canada
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
