let { SyncBailHook } = require('tapable')

// class SyncBailHook {
//   constructor() {
//     this.hooks = [];
//   }

//   tap(name, fn) {
//     this.hooks.push(fn)
//   }

//   call() {
//     for(let i = 0; i < this.hooks.length; i++) {
//       let res = this.hooks[i](...arguments)
//       if(res === 'wrong') break
//     }
//   }
// }

// events EventEmitter
// 当触发此事件时候需要传入name参数，然后监听函数可以获取name参数
// 同步钩子, 遇到返回值，则不继续往下执行
let queue = new SyncBailHook(['name', 'age'])
queue.tap('1', function(name, age) {
  console.log(name, 1)
  return 'wrong'
})

queue.tap('2', function(name, age) {
  console.log(name, 1)
})

queue.tap('3', function(name, age) {
  console.log(name, 1)
})

// 触发事件
queue.call('zx')