/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        port: "",
        protocol: "https",
        hostname: "tokens.1inch.io",
      },
    ],
  },
};

module.exports = nextConfig;
