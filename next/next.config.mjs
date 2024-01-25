/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: '*',
      //   port: '',
      //   pathname: '/**',
      // },
      // {
      //   protocol: 'http',
      //   hostname: '*',
      //   port: '',
      //   pathname: '/**',
      // },
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
