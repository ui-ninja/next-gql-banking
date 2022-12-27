/** @type {import('next').NextConfig} */
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
    MONGOOSE_URL:
      'mongodb+srv://specialist:Ma9Y23rvZ0yJJkeB@cluster0.k84ucnq.mongodb.net/?retryWrites=true&w=majority',
    GRAPHQL_ENDPOINT: 'http://localhost:3000/api/graphql',
    SECRET: 'randomLooooooooooooooooongString',
    NEXTAUTH_URL: 'http://localhost:3000/',
  },
};

module.exports = nextConfig;
