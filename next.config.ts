/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
       
       
        pathname: '/uploads/**',
      },
      {
        protocol: "https",
        hostname: "images.unplash.com"
      },
      {
        protocol: "https",
        hostname: "images.pexels.com"
      }
    ],
  },
};

export default nextConfig;