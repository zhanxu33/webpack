const path = require('path')
const htmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
  entry: {
    lazyLoad: './src/index.js'
  },
  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },
  module: {},
  plugins: [
    new htmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  devServer: {
    inline: true
  },
  optimization: {
    minimize: false
  }
}