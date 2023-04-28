const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(mp3)$/i,
        type: 'asset/',
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [{ from: './assets/', to: 'assets/' }],
    }),
  ],
};
