# webpack 
列几个关键点
1.提取css
1.1 3及以下使用Extract Text Plugin
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

1.2 4.0使用mini-css-extract-plugin,5.0据说会内置提取CSS模块
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
  }
}

2. 提取js
2.1 基础类库，方便长期缓存
增加一个入口，名字为vender
2.2 页面之间的公用代码
  webpack3及以前使用commonschunkplugin
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
  上面会把 jquery vue main和main1的公共代码提取到common  webpack的代码提取到load
  
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
          name: "jquery",
          minChunks:2,
          chunks:["main","main1"]
      })
  ]
  上面会把main和main1的公共业务代码打包到jquery里，如果minChunks改为Infinity,则不会将公共代码打包进jquery的chunk里
  webpack 4.0使用common-chunk-and-vendor-chunk
  optimization: {
		splitChunks: {
			cacheGroups: {
				commons: {
					chunks: "initial",  // 从入口开始，提取多个entry里面共有的代码
					minChunks: 2,
					maxInitialRequests: 5, // The default limit is too small to showcase the effect
					minSize: 0 // This is example is too small to create commons chunks
				},
				vendor: {   // 提取node_modules里的代码到vender
					test: /node_modules/,
					chunks: "initial",
					name: "vendor",
					priority: 10,
					enforce: true
				}
			}
		}
	}
  3. treeshaking,根据ES6 Module做优化，去掉未使用的代码
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
    再使用压缩混淆即可
  
