const nextConfig = {
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
              style-src 'self' 'unsafe-inline' https://js.stripe.com https://fonts.googleapis.com;
              frame-src 'self' https://checkout.stripe.com https://js.stripe.com/;
              connect-src 'self' https://checkout.stripe.com http://localhost:5000 https://tattoo218-backend-de45108a854b.herokuapp.com https://api.cloudinary.com;
              img-src 'self' 'unsafe-inline' https://*.stripe.com https://marineagency.com https://png.pngtree.com data:;
              font-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://fonts.gstatic.com/;
            `.replace(/\n/g, ''),
          },
        ],
      },
    ];
  },
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain here
  },
  async redirects() {
    return [
      {
        source: '/_error', // Match any route that doesn't exist
        destination: '/', // Redirect to the home page
        permanent: false // Use a temporary redirect (307)
      },
    ];
  },
};

export default nextConfig;

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





