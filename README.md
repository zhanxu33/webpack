# webpack 列几个关键点
### 1.提取css
#### 1.1 3及以下使用Extract Text Plugin
```
const extractCSS = new ExtractTextPlugin('stylesheets/[name]-one.css');
const extractLESS = new ExtractTextPlugin('stylesheets/[name]-two.css');
module: {
  rules: [
    {
      test: /\.css$/,
      use: extractCSS.extract([ 'css-loader', 'postcss-loader' ])
    },
    {
      test: /\.less$/i,
      use: extractLESS.extract([ 'css-loader', 'less-loader' ])
    },
  ]
},
plugins: [
  extractCSS,
  extractLESS
]
```
#### 1.2 4.0使用mini-css-extract-plugin,5.0据说会内置提取CSS模块
```
plugins: [
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename:'[id].[hash].css',
  })
],
rules: [
  {
    test: /\.(sa|sc|c)ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'postcss-loader',
      'sass-loader',
    ],
  }
]
```
### 2. 提取js
#### 2.1 基础类库，方便长期缓存
增加一个入口，名字为vender
#### 2.2 页面之间的公用代码
webpack3及以前使用commonschunkplugin
```
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");
entry: {
    main: process.cwd()+'/example4/main.js',
    main1: process.cwd()+'/example4/main1.js',
    jquery:["jquery"],
    vue:["vue"]
},
output: {
    path: process.cwd() + '/dest/example4',
    filename: '[name].js'
},
plugins: [
    new CommonsChunkPlugin({
        name: ["common","jquery","vue","load"],
        minChunks:2
    })
]
```
上面会把 jquery vue main和main1的公共代码提取到common  webpack的代码提取到load
```
entry: {
    main: process.cwd()+'/example6/main.js',
    main1: process.cwd()+'/example6/main1.js',
    jquery:["jquery"]
},
output: {
    path: process.cwd()  + '/dest/example6',
    filename: '[name].js'
},
plugins: [
    new CommonsChunkPlugin({
        // 第一个是公共代码的地方，如果entry没有则新增一个，有的话就打包到一起，第二个是公共框架、类库这种模块
        // 最后是一个webpack的runtime
        name: ["common","jquery","load"],
        // 最小化打包数，如果是Infinity，则不会吧公共代码打包到第一里面
        minChunks:2,
        // 指定哪些chunk的公共代码会打包到common里
        chunks:["main","main1"]
    })
]
```
上面会把main和main1的公共业务代码打包到common里，如果minChunks改为Infinity,则不会将公共代码打包进jquery的chunk里
webpack 4.0使用common-chunk-and-vendor-chunk
```
optimization: {
  minimize: false,
  // 提取webpack运行时代码为manifest，如果名字和下面的一样，会打包到一起
  runtimeChunk: {
    // 打包到venders里面
    name: 'js/vendors'
  },
  splitChunks: {
    chunks: "async",
    minSize: 3000, // 最小多少才提取
    minChunks: 1,
    // 这个才是关键
    cacheGroups: {
      // 提取node_modules中的代码为vender
      crazyvegetable: {
        chunks: "initial",  // 从入口开始，提取多个entry里面共有的代码，如果是 all的话，会把所有入口和动态加载的代码都打包进
        test: /node_modules/,
        name: "js/vendors",
        priority: 10,
        enforce: true
      },
      // 提取多个入口的公共代码
      commons: {
        name: "js/commons",
        chunks: "initial",
        minChunks: 2, // 最少公用数
        maxInitialRequests: 5, // The default limit is too small to showcase the effect
        minSize: 0 // This is example is too small to create commons chunks
      }
    }
  }
}

```
### 3. treeshaking,根据ES6 Module做优化，去掉未使用的代码
```
{
  test: /\.js$/,
  use: {
    loader: 'babel-loader',
    query: {
      presets: [
        // 不把es6 module的语法编译为ES5
        ["env", { module: false }]
      ]
    }
  }
}
{
"name": "your-project",
"sideEffects": [  //不使用treeshaking的，有的地方不是单纯的使用export和import，避免误删
    "./src/some-side-effectful-file.js",
    "*.css"  
]
```
再使用压缩混淆即可

### 4.模拟webpack,自己写打包工具
emm,具体在代码里面，主要是2个对象的理解
注意： npm link的时候，package.json里面增加bin字段，然后指定执行的js文件，js文件最上面加上`#!/usr/bin/env node`
  
