const path = require('path')

module.exports = {
  entry: {
    index: './src/index.js'
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js'
  },

  // 配置查找loader的目录
  resolveLoader: {
    modules: [
      'node_modules',
      path.resolve(__dirname, 'src', 'loaders')
    ]
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: path.resolve(__dirname, 'src', 'loaders', 'jsloader'),
          options: {
            hehe: true
          }
        }
      },
      {
        test: /\.less$/,
        use: ['style-loader', 'less-loader']
      }
    ]
  },

  optimization: {
    minimize: false
  }
} 