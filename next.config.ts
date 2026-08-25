import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export -> ./out. Deployed as plain files on Cloudflare's free tier,
  // so there are no Worker invocations to pay for and nothing to keep warm.
  output: "export",
  // Next's image optimizer needs a server; a static export has none.
  images: { unoptimized: true },
  // Emits /contact/index.html so the route resolves without host-specific rewrites.
  trailingSlash: true,
};

export default nextConfig;
