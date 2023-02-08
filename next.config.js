/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    if (!config.experiments) {
      config.experiments = {};
    }
    config.experiments.topLevelAwait = true;
    return config;
  },
  env: {
    MONGOOSE_URL: process.env.MONGOOSE_URL,
    GRAPHQL_ENDPOINT: process.env.GRAPHQL_ENDPOINT,
    SECRET: process.env.SECRET,
  },
};

module.exports = withBundleAnalyzer(nextConfig);
