import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactStrictMode: true,
};

module.exports = {
  env: {
    BASE_URL: "http://localhost:4000",
  },
};

export default nextConfig;
