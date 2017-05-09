const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: './public/index.html',
  filename: 'index.html',
  inject: 'body'
});

const CopyWebpackPlugin = require('copy-webpack-plugin');
const copyWebpackPlugin = new CopyWebpackPlugin([
  {
    from: './public'
  }
], {
  ignore: [
    'index.html'
  ]
});

module.exports = {
  devtool: 'source-map',
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    path: path.join(__dirname, '/dist/'),
    filename: 'assets/js/bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ }
    ]
  },
  plugins: [
    htmlWebpackPlugin,
    copyWebpackPlugin,
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('production')
    })
  ]
}
