/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/uploads/:path*',
        // destination: 'http://localhost:9003/uploads/:path*',
        destination: 'https://api.supporthelp.online/uploads/:path*',
      },
    ];
  },
};

export default nextConfig;
