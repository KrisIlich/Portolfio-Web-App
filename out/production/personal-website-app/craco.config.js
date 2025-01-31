module.exports = {
    webpack: {
        configure: (webpackConfig) => {
            webpackConfig.resolve.fallback = {
                "path": require.resolve("path-browserify"),
                "os": require.resolve("os-browserify/browser"),
                "crypto": require.resolve("crypto-browserify"),
                "stream": require.resolve("stream-browserify"),
                ...webpackConfig.resolve.fallback
            };
            return webpackConfig;
        }
    }
};
