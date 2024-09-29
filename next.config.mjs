export default {
  async headers() {
    return [
      {
        // Match all routes
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: `
              script-src 'self' 'unsafe-inline' 'unsafe-eval' https://js.stripe.com https://*.js.stripe.com https://checkout.stripe.com https://connect-js.stripe.com https://maps.googleapis.com;
              style-src 'self' 'unsafe-inline' 'sha256-47DEQpj8HBSa+/TImW+5JCeuQeRkm5NMpJWZG3hSuFU=' https://js.stripe.com https://fonts.googleapis.com;
              frame-src 'self' https://checkout.stripe.com https://js.stripe.com/;
              connect-src 'self' https://checkout.stripe.com http://localhost:5000 https://tattoo218-backend-de45108a854b.herokuapp.com;
              img-src 'self' 'unsafe-inline' https://*.stripe.com https://marineagency.com https://png.pngtree.com;
              font-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com/;
            `.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
};

//   /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['res.cloudinary.com'],
//     },

//     // images: {
//     //     remotePatterns: [
//     //       {
//     //         protocol: 'https',
//     //         hostname: 'assets.example.com',
//     //         port: '',
//     //         pathname: '/account123/**',
//     //       },
//     //     ],
//     //   },
// };

// export default nextConfig;





