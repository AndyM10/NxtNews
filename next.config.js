/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    API_KEY: "",
  },
  experimental: {
    appDir: true
  }
};

module.exports = nextConfig;
