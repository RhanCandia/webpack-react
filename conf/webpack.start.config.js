const path = require('path');
const webpack = require('webpack');
const WebpackConfig = require('webpack-config').default;

config = new WebpackConfig()
  .extend(path.resolve(__dirname, './webpack.base.config.js'))
  .merge({
    devtool: "eval-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "../public"),
      port: 3000,
      compress: true,
      historyApiFallback: true,
      hot: true,
      open: true,
      https: false,
      noInfo: true
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ],
  });

module.exports = config;