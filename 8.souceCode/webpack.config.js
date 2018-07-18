const path = require('path')

module.exports = {
  entry: {
    index: './tapable/1.SyncHook.js'
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  }
} 