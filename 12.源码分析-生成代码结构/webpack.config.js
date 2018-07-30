const path = require('path')
const webpack = require('webpack')
module.exports = {
  entry: {
    index: './src/index.js',
    vender: 'lodash',
    jquery: 'jquery'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ["common","jquery","lodash","load"],
      minChunks:2
  })
  ]
}