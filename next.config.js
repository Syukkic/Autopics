/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dalleprodsec.blob.core.windows.net',
      },
    ],
  },
};

module.exports = nextConfig;
