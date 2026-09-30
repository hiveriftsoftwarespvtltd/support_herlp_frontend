/** @type {import('next').NextConfig} */
const isDev = process.env.NODE_ENV === 'development';
const uploadsDestination = process.env.NEXT_PUBLIC_UPLOADS_URL
  ? process.env.NEXT_PUBLIC_UPLOADS_URL
  : isDev
  ? 'http://localhost:9003/uploads/:path*'
  : 'https://api.supporthelp.online/uploads/:path*';

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9003',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'api.supporthelp.online',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'supporthelp.online',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'adequatebookkeeping.com',
        pathname: '/**',
      },
    ],
  },
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        destination: uploadsDestination,
      },
    ];
  },
};

export default nextConfig;

