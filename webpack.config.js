const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

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
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify((process.env.PRODUCTION) ? 'production' : 'development')
    })
  ]
}

if (process.env.PRODUCTION) {
  config.devtool = "source-map";
  config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false,
      drop_console: false,
    },
    sourceMap: true
  }));
} else {
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin()
  );
}

console.log(config.plugins);

module.exports = config;