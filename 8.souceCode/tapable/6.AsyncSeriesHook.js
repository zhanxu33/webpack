let {AsyncSeriesHook} = require('tapable')
// 异步串行执行,前一个执行完了后面的才执行
let queue = new AsyncSeriesHook(['name'])
console.time('zx')
// 第一个参数放插件的名字 ‘1’
queue.tapAsync('1', function(name, cb) {
  setTimeout(function() {
    console.log(1, name)
    cb()
  }, 1000)
})

queue.tapAsync('2', function(name, cb) {
  setTimeout(function() {
    console.log(2, name)
    cb()
  }, 1000)
})

queue.callAsync('zx', () => {
  console.timeEnd('zx')
})

// AsyncSeriesBailHook 有一个cb()传入wrong，后面的不执行
// AsyncSeriesWaterfallHook 上一个的结果传给下一个