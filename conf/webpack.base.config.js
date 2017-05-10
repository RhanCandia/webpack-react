const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');

let config = {
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        include: path.resolve(__dirname, "../src"),
        exclude: path.resolve(__dirname, "../node_modules"),
        use: [{
          loader: "babel-loader",
          options: {
            presets: [
              ["es2015", {
                "es2015": {
                  "loose": true,
                  "modules": false
                }
              }], "react"
            ]
          }
        }]
      }
    ]
  },
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
}

module.exports = config;