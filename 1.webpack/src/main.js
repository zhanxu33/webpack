import color from './color'
require('./index.css')
require('./less.less')
require('./sass.scss')
require('bootstrap')
// 返回一个打包以后的地址
let src = require('./img/1.jpg')
let img = new Image()
img.src = src
document.body.appendChild(img)
console.log(color)