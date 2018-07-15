const path = require('path')
const htmlWebPackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const UglifyJSPlugin = require('uglifyjs-webpack-plugin')
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin')
module.exports = {
  entry: {
    index: './src/index.js',
    hotIndex: './src/main.js',
    pageA: './src/getCommon/pageA.js',
    pageB: './src/getCommon/pageB.js',
    pageC: './src/getCommon/pageC.js',
    Concat: './src/Hoisting/host.js'
  },

  output: {
    path: path.resolve('dist'),
    filename: '[name].js'
  },

  devServer: {
    inline: true, // 打包以后文件里注入一个websocket客户端
    hot: true, // 启动模块热加载，模块某一个地方改了，不用刷新整个页面，部分刷新
    open: true // 自动打开浏览器
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          query: {
            presets: [
              // 不把es module的语法编译为ES5
              ["env", { module: false }]
            ]
          }
        }
      },
      {
        test: /\.css$/,
        // 内置了热更新的功能，不用再写module.hot
        loader: ['style-loader', 'css-loader']
      }
    ]
  },
  
  plugins: [
    new htmlWebPackPlugin({
      template: './src/index.html'
    }),
    // 启动热加载
    new webpack.HotModuleReplacementPlugin(),
    // 用名称代替ID
    new webpack.NamedModulesPlugin(),
    // new UglifyJSPlugin()
    // 代码在运行时因为创建的函数作用域更少了，内存开销也随之变小,让 Webpack 打包出来的代码文件更小、运行的更快
    new ModuleConcatenationPlugin()
  ],

  // 优化
  optimization: {
    // 基础类库，方便长期缓存
    // 页面之间的公用代码
    // 各个页面单独生成文件
    splitChunks: {
      cacheGroups: {
        // 不同页面之间的公用模块
        commons: {
          // 从最开始
          chunks: 'initial',
          // 最少有2个模块重复，就会提取出来
          minChunks: 2,
          maxInitialRequests: 5, 
          minSize: 0
        },
        // 第三方
        vender: {
          // 从最开始
          chunks: 'initial',
          test: /node_modules/,
          name: 'vender',
          priority: 10,
          enforce: true
        }
      }
    },
    minimize: false
  }
}