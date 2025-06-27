const path = require('path');

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
    configure: (webpackConfig) => {
      
      webpackConfig.resolve = {
        ...webpackConfig.resolve,
        extensions: [
          ...new Set([
            ...(webpackConfig.resolve?.extensions || []),
            '.tsx',
            '.ts',
            '.js',
            '.jsx',
            '.json', 
          ]),
        ],
        mainFiles: ['index', ...(webpackConfig.resolve?.mainFiles || [])],
      };
  
      return webpackConfig;
    },
  },
};