const withTM = require("next-transpile-modules")(["eth-hooks"]); // As per comment.
const withPlugins = require("next-compose-plugins");

const nextConfig = {
  target: "serverless",
  webpack(config, { isServer }) {
    /// below is not required for the problem described. Just for reference.(es6)
    // config.module.rules.push({ test: /\.yml$/, use: "raw-loader" });

    if (!isServer) {
      config.node = {
        fs: "empty",
      };
    }
    return config;
  },
  images: {
    // FIXME remove before going live, just a placeholder for assets
    domains: ["via.placeholder.com"],
  },
};

module.exports = withPlugins([withTM], nextConfig);
