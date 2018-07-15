const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const CopyWebPackPlugin = require('copy-webpack-plugin')
/*
  把页面中的CSS文件单独拉出来保存加载
  使用 extract-text-webpack-plugin
  const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
  let cssExtract = new ExtractTextWebpackPlugin('css/css.css')
  // let lessExtract = new ExtractTextWebpackPlugin('css/less.css');
  // let sassExtract = new ExtractTextWebpackPlugin('css/sass.css');
*/
// webpack内部有一个事件流， tapable 1.0
// 在.bin目录下有很多命令，npm执行不了，需要通过npx执行
module.exports = {
  // entry: ['./src/index.js', './src/base.js']
  // 也可以是字符串
  // 放一个对象，作为多入口,先找到每个入口，然后从各个入口分别出发，找到依赖的模块（module），
  // 然后生成一个Chunk（代码块），一个chuank下有好多module，然后把chunk写到文件系统中(Assets)，
  entry: {
    index: './src/main.js'
    // index: './src/index.js',
    // base: './src/base.js',
    // vender第三方代码入口，也是公共代码提出出来的办法,注意在js里面import引入的灰打包到一起
    // vender: 'jquery'
    // common: './src/common.js' 公共代码，可以这样提取出来，在html配置的chunks里面选择
  },

  output: {
    path: path.join(__dirname, 'dist'), // 输出文件夹，只能是绝对路径
    // name是entry名字，默认是main, hash根据打包以后的文件生成的
    filename: '[name].[hash:5].js' //打包以后的文件名
  },

  resolve: {
    // 引入模块的时候可以不加扩展名,""从左往右找
    extensions: ["", ".js", ".less", ".css"],
    alias: {
      // 别名
      "bootstrap": "bootstrap/dist/css/bootstrap.css"
    }
  },

  // 调试使用的
  // devtool: 'souce-map', //单独的文件 .map，帮助映射错误的信息，可以定位到哪一列出错
  // devtool: 'cheap-module-souce-map', //单独的文件，体积更小，但只能定位到哪一行出错
  // devtool: 'eval-souce-map', //不会生成单独的文件，把souce-map文件放到打包后的源文件中
  // devtool: 'cheap-module-eval-souce-map', //不会生成单独的文件,只定位到行

  // 表示监控源文件的变化，当源文件变化后，重新打包, 先执行npm run build 然后进入监控状态
  // watch: true,
  // watchOptions: {
  //   // 不包括这些文件
  //   ignored: /node_modules/,
  //   // 每秒询问1000次，看文件有没有发生变化
  //   poll: 1000,
  //   aggregateTimeout: 500 //每次改动后，500毫秒内没改动再编译，类似防抖
  // },

  /*
    loader 有三种写法
    use
    loader
    use+loader
  */
  module: {
    rules: [
      // expose-loader(loader),?,变量名字!模块名或者路径 会先加载这个模块，然后得到模块到处对象，并且挂载到window
      // 向全局暴露这个,不然在这个模块的其他子模块内，无法使用这个变量,模块之前的变量不能公用
      //let $ = require('expose-loader?$!jquery')  这2种方式是一样的
      // {
      //   test: /^jquery$/ || require.resolve('jquery') 得到这个模块的绝对路径,
      //   loader: 'expose-loader?$'     || loader
      //   use: {                        || use + loader
      //      loader: 'expose-loader',
      //      options: '$'
      //   }
      // },
      // 有4项配置
      {
        test: /\.css$/,
        // 只有一个可以只写一个字符串
        // css-loader用来解析处理CSS文件中的URL路径,把CSS文件变成一个模块
        // style-loader 可以把css文件变成style标签插入
        // 多个loader要从右往左写，转换的时候从右往左转换
        // loader: ['style-loader','css-loader?minimize', 'postcss-loader']
        loader: ['style-loader','css-loader?minimize']
        // 此插件使用css-loader 处理一下css文件
        // loader: cssExtract.extract({
        //   use: ['css-loader', 'postcss-loader']
        // })
      },
      {
        test: /\.less$/,
        loader: ['style-loader', 'css-loader', 'less-loader']
        // loader: lessExtract.extract({
        //   use: ['css-loader', 'less-loader']
        // })
      },
      {
        test: /\.scss$/,
        loader: ['style-loader', 'css-loader', 'sass-loader']
        // loader: sassExtract.extract({
        //   use: ['css-loader', 'sass-loader']
        // })
      },
      {
        test: /\.js$/,
        use: {
          // 靠后面的预设转换
          loader: 'babel-loader',
          query: {
            // 指定预设，stage-0 解析ES7
            presets: ["env", "stage-0", "react"]
          }
        }
      }, 
      {
        test: /\.(png|jpg|gif|svg|bmp)$/,
        // file-loader解析图片地址  把图片从原位置拷贝到目标位置，并且修改原引用地址
        // 可以处理任意的二进制数据，字体也可以
        // url-loader 可以在文件比较小的时候，直接变成base64字符串内嵌到页面中
        use: {
          // loader: 'file-loader',
          // // 指定拷贝文件的输出目录
          // options: {
          //   outputPath: 'img/'
          // }
          loader: 'url-loader',
          options: {
            // 5K以下变成base64
            limit: 5*1024,
            outputPath: 'img/'
          }
        }
      },
      {
        test: /\.(html|htm)$/,
        loader: 'html-withimg-loader'
      }
    ]
  },

  plugins: [
    // 用来自动向模块注入变量
    new webpack.ProvidePlugin({
      $: 'jquery'
    }),
    // 清除目录
    new CleanWebpackPlugin([path.join(__dirname, 'dist')]),
    // 自动产出html文件
    new HtmlWebPackPlugin({
      template: './src/index.html',  // 指定html模板
      filename: 'index.html', // 生成的html。保存在output目录下
      title: 'hello webpack index', // 向html传参数
      chunks: ['index' /* , 'vender' */], //产出的HTML文件里引入哪些代码块，,默认插入所有产生的js文件，和entry的key一致
      hash: true, // 在引入的js里加入查询字符串避免缓存
      minify: {
        removeAttributeQuotes: true // 去掉属性双引号
      }
    }),
    new CopyWebPackPlugin([{
      from: path.join(__dirname, 'src', 'public'),
      to: path.join(__dirname, 'dist', 'public')
      // to: path.join(__dirname, 'dist/public')
    }])
    // new HtmlWebPackPlugin({
    //   template: './src/index.html',  // 指定html模板
    //   filename: 'base.html', // 生成的html。保存在output目录下
    //   title: 'hello webpack base', // 向html传参数
    //   chunks: ['base'/* , 'vender' */],
    //   hash: true, // 在引入的js里加入查询字符串避免缓存
    //   minify: {
    //     removeAttributeQuotes: true // 去掉属性双引号
    //   }
    // })
    // cssExtract
    // lessExtract,
    // sassExtract
  ],
  // 配置此静态文件服务器，可以预览打包后的项目
  // 打包后的文件在内存里
  // 往前端注入一个websocket,更改了代码，会重新编译，并刷新前端
  devServer: {
    contentBase: './dist',
    host: 'localhost',
    port: 8080,
    compress: true, //服务端给浏览器的时候，是否启用Gzip压缩
  },

  // 4.0+ webpack自动启动压缩，用这个不压缩
  optimization: {
    minimize: false
  }
}