let { SyncHook } = require('tapable')
// class SyncHook {
//   constructor() {
//     this.hooks = [];
//   }

//   tap(name, fn) {
//     this.hooks.push(fn)
//   }

//   call() {
//     this.hooks.forEach(hook => hook(...arguments))
//   }
// }

// events EventEmitter
// 当触发此事件时候需要传入name参数，然后监听函数可以获取name参数
// 同步钩子,不关心返回值
let queue = new SyncHook(['name', 'age'])
queue.tap('1', function(name, age) {
  console.log(name, 1)
})

queue.tap('2', function(name, age) {
  console.log(name, 1)
})

queue.tap('3', function(name, age) {
  console.log(name, 1)
})

// 触发事件
queue.call('zx')