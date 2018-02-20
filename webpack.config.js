var nodeExternals = require('webpack-node-externals')

module.exports = {
   entry: './index.js',
   target: 'node',
   externals: [nodeExternals()],
   output: {
      libraryTarget: 'commonjs',
      path: '.webpack',
      filename: 'index.js', // this should match the first part of function handler in serverless.yml
   },
   module: {
      loaders: [
         {
            test: /\.jsx?$/,
            exclude: /node_modules/,
            loaders: ["babel-loader"]
         }
      ]
   }
};
