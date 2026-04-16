import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compiler:
    process.env.NODE_ENV === "production"
      ? {
          removeConsole: {
            exclude: ["error", "warn"],
          },
        }
      : {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.admin.landsales.com.au",
        pathname: "/wp-content/uploads/**",
      },
    ],
  },
  trailingSlash: true,
};

export default nextConfig;
