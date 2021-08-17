// module.exports = {
//   webpack: (config, { isServer }) => {
//     // Fixes npm packages that depend on `fs` module
//     if (!isServer) {
//       config.node = {
//         fs: "empty",
//       };
//     }

//     return config;
//   },
// };

// const withTM = require('next-transpile-modules')(['@babylonjs']);
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
      config.resolve.alias["@sentry/node"] = "@sentry/browser";
    }
    return config;
  },
  images: {
    domains: ["gog-art-assets.s3-ap-southeast-2.amazonaws.com"],
  },
};

module.exports = withPlugins([withTM], nextConfig);
