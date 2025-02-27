import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: "replicate.delivery",
        pathname: '**',
      },
      {
        protocol: "https",
        hostname: "vvgsrinygnwtqbnqtgvc.supabase.co",
        pathname: "**",
      },
    ],
  },
  webpack: (config) => {
    config.module.exprContextCritical = false;
    
    return config;
  },
};

export default nextConfig;
