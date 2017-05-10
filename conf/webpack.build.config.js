const path = require('path');
const webpack = require('webpack');
const WebpackConfig = require('webpack-config').default;
const WebpackCleanupPlugin = require('webpack-cleanup-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');

module.exports = new WebpackConfig()
  .extend(path.resolve(__dirname, './webpack.base.config.js'))
  .merge({
    output: {
      path: path.resolve(__dirname, "../dist"),
      filename: "static/js/bundle.js",
      publicPath: "./"
    },
    devtool: 'cheap-source-map',
    plugins: [
      new WebpackCleanupPlugin(),
      new CompressionWebpackPlugin(),
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, '../static') }
      ]),
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        compress: {
          warnings: false
        }
      }),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('production')
      })
    ]
  });