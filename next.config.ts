import type { NextConfig } from "next";

/**
 * 静态导出，托在 GitHub Pages 的子路径上：
 *   https://am5188.github.io/harness-guide/
 *
 * 改仓库名的话，记得同步改 BASE_PATH（或删掉这一项用自定义域名/根路径）。
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? "/harness-guide";

const nextConfig: NextConfig = {
  output: "export",
  basePath: BASE_PATH,
  assetPrefix: BASE_PATH,
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
