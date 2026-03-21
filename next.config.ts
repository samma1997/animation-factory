import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/animation-factory",
  images: { unoptimized: true },
  trailingSlash: true,
};

export default nextConfig;
