/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
];

const nextConfig = {
  reactStrictMode: false,
  env: {
    NEXTAUTH_URL: "https://www.mkinfo.uz",
    // NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "Ey7nTKnggBc0bRN8WUjyShw2qzOZ6KW4fUyqcKBePxY=",
  },
  // async redirects() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/",
  //       permanent: true,
  //       basePath: false,
  //     },
  //   ];
  // },

  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
