const path = require('path')
const demoPlugin = require('./src/plugins/demoPlugin.js')
const AsyncPlugin = require('./src/plugins/AsyncPlugin.js')
module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  plugins: [
    new demoPlugin({
      hehe: true
    }),
    new AsyncPlugin()
  ],

  optimization: {
    minimize: false
  }
} 