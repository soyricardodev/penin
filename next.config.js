await import("./src/env.js");

/** @type {import("next").NextConfig} */
const coreConfig = {
  images: {
    remotePatterns: [{ hostname: "utfs.io" }],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  async rewrites() {
    return [
      {
        source: "/ingest/static/:path",
        destination: "https://us-assets.i.posthog.com/static/:path",
      },
      {
        source: "/ingest/:path",
        destination: "https://us.i.posthog.com/:path",
      },
    ];
  },
};

export default coreConfig;

// Injected content via Sentry wizard below

// import { withSentryConfig } from "@sentry/nextjs";

// export default withSentryConfig(
//   coreConfig,
//   {
//     silent: true,
//     org: "ricardo-castro",
//     project: "penim",
//   },
//   {
//     widenClientFileUpload: true,
//     transpileClientSDK: true,
//     tunnelRoute: "/monitoring",
//     hideSourceMaps: true,
//     disableLogger: true,
//     automaticVercelMonitors: true,
//   },
// );
