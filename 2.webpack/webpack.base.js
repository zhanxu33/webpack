const path = require('path')
const webpack = require('webpack')
const happyPack = require('happyPack')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  // 引入一个模块的时候，要进行解析
  // 需要指定除node_modules之外的其他目录，用这个，比如import ajax from 'ajax',就会先到下面2个模块去找，更快
  // 可以减少路径的查找，更快
  resolve: {
    // modules: ['node_modules', './lib']
    // path.resolve指定绝对路径
    modules: [path.resolve('node_modules'), path.resolve('./lib')],
    extensions: [".js", ".json"],
    // 文件查找的时候，会从package.json 的字段进行查找，先找main,然后是node和broswer
    // 如果不配的话，默认是先找package.json 的module和main
    mainFields: ['main', 'node', 'broswer'],
    alias: {
      // 当使用import(react)的时候，直接从这个地方加载,速度更快
      // react: path.resolve('./sdas/react.min.js')
    }
  },

  module: {
    // 当解析到的文件是下面这些时，就不要解析了，用于已经解析过的地方
    // noParse: [/react\.min\.js/],
    rules: [
      {
        test: /\.jsx?$/,
        use: [{
          loader: 'babel-loader',
          // options: {
          //   // 预设，分别编译 ES6 ES7 REACT
          //   presets: ["env", "stage-0", "react"]
          // }
        }],
        // 只转换或编译SRC目录下的文件
        include: path.resolve('./src'),
        // 不转换node_modules
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css',
        include: path.resolve(__dirname, 'src')
      }
    ]
  },

  plugins: [
    // 定义环境变量，可以在代码里面直接使用
    new webpack.DefinePlugin({
      _development_: JSON.stringify(process.env.NODE_ENV)
    }),
    // 使用动态链接库
    new webpack.DllReferencePlugin({
      manifest: path.join(__dirname, 'dist', 'manifest.json')
    }),
    // 多进程打包
    new happyPack({
        id: 'css',
        loaders: ['style-loader', 'css-loader'],
        threads: 4, //代表开启几个子进程去处理这一类型的文件
        verbose: true //是否允许输出日志
    }),
    new ParallelUglifyPlugin({
      workerCount: 3, //开启几个子进程去并发的执行压缩。默认是当前运行电脑的 CPU 核数减去1
      uglifyJS: {
        output: {
          beautify: false, //不需要格式化
          comments: false, //不保留注释
        },
        compress: {
          warnings: false, // 在UglifyJs删除没有用到的代码时不输出警告
          drop_console: true, // 删除所有的 `console` 语句，可以兼容ie浏览器
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        }
      },
    })
  ],

  // 4.0+ webpack自动启动压缩，用这个不压缩
  optimization: {
    minimize: false
  }
}