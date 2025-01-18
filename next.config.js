/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ["@mui/x-charts"],
  images: {
    domains: [
      "res.cloudinary.com",
      "images.pexels.com",
      "img.freepik.com",
      "images.unsplash.com",
    ],
  },
};

module.exports = nextConfig;
