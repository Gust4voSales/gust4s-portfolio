import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { hostname: "img.youtube.com" },
      { hostname: "github.com" },
      { hostname: "play-lh.googleusercontent.com" },
      { hostname: "camo.githubusercontent.com" },
      { hostname: "sol-vitrine.vercel.app" },
    ],
  },
};

export default nextConfig;
