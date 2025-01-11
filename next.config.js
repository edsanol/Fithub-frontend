/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  images: {
    domains: ["res.cloudinary.com"],
  },
};

module.exports = nextConfig;
