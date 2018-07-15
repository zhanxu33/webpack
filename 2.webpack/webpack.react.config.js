const path = require('path')
const webpack = require('webpack')
/*
  target: '_dll_[name]'
*/
module.exports = {
  entry: {
    react: ['react', 'react-dom']
  },

  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]_dll.js', //输出动态链接库的名称
    libraryTarget: 'var', // var _dll_react = {},默认方式，还可以是window this export
    library: '_dll_[name]' // 全局变量的名字 window._dll_react
  },

  // manifest 描述文件
  plugins: [
    new webpack.DllPlugin({
      // 这个name是指定manifest.json里的名字
      name: '_dll_[name]',
      path: path.join(__dirname, 'dist', 'manifest.json')
    })
  ],

  // 4.0+ webpack自动启动压缩，用这个不压缩
  optimization: {
    minimize: false
  }
}