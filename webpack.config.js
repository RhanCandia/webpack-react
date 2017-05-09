const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const compressionWebpackPlugin = require("compression-webpack-plugin");
const copyWebpackPlugin = require('copy-webpack-plugin');

let config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "static/js/bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: [
          path.resolve(__dirname, "src")
        ],
        exclude: [
          path.resolve(__dirname, "node_modules")
        ],
        loader: "babel-loader"
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "public"),
    port: 3000,
    compress: true,
    historyApiFallback: true,
    hot: true,
    open: true,
    https: false,
    noInfo: true
  },
  devtool: "eval-source-map",
  plugins: [
    new compressionWebpackPlugin(),
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify((process.env.PRODUCTION) ? 'production' : 'development')
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: false,
      },
      sourceMap: true
    })
  ]
}

if (process.env.PRODUCTION) {
  config.devtool = "cheap-source-map";
  config.plugins.push(new copyWebpackPlugin([
    { from: 'public' },
    { ignore: [ 'index.html' ] }
  ]));
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;