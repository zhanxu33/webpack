let { SyncWaterfallHook } = require('tapable')

// class SyncWaterfallHook {
//   constructor() {
//     this.hooks = [];
//   }

//   tap(name, fn) {
//     this.hooks.push(fn)
//   }

//   call() {
//     let res
//     for(let i = 0; i < this.hooks.length; i++) {
//       res = i == 0 ? this.hooks[i](...arguments) : this.hooks[i](res)
//     }
//   }
// }

// events EventEmitter
// 当触发此事件时候需要传入name参数，然后监听函数可以获取name参数
// 同步钩子, 上一个函数的返回值传给下一个
let queue = new SyncWaterfallHook(['name'])
queue.tap('1', function(name) {
  console.log(name, 1)
  return 'wrong'
})

queue.tap('2', function(name) {
  console.log(name, 1)
})

queue.tap('3', function(name) {
  console.log(name, 1)
})

// 触发事件
queue.call('zx')