const path = require('path')
module.exports = {
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]_[hash:8].js',
    // 指定文件的引用路径，CDN或者其他的
    publicPath: 'http://img.abc.cn'
  }
}