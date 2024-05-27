/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['res.cloudinary.com'],
    },

    // images: {
    //     remotePatterns: [
    //       {
    //         protocol: 'https',
    //         hostname: 'assets.example.com',
    //         port: '',
    //         pathname: '/account123/**',
    //       },
    //     ],
    //   },
};

export default nextConfig;

