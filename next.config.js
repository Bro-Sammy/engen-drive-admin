/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["randomuser.me", "images.unsplash.com","res.cloudinary.com"],
  },
};

module.exports = nextConfig;
