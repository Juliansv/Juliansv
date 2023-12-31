/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "w7.pngwing.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  experimental: {
    serverActions: true,
  },
  compiler: {
    styledComponents: true
  }
};

module.exports = nextConfig;
