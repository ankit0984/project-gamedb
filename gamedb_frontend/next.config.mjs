/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i0.wp.com", // Existing hostname
        pathname: "**", // Allow images from any path
      },

      {
        protocol: "https",
        hostname: "shared.fastly.steamstatic.com", // New hostname
        pathname: "**", // Allow images from any path
      },
    ],
  },
  output: "standalone",
};

export default nextConfig;
