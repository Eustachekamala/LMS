import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators : false,
  experimental : {
    dynamicIO : true,
    authInterrupts : true
  },
};

export default nextConfig;
