let { SyncLoopHook } = require('tapable')

// class SyncLoopHook {
//   constructor() {
//     this.hooks = [];
//   }

//   tap(name, fn) {
//     this.hooks.push(fn)
//   }

//   call() {
//     let res
//     do{
//       res = this.hooks[0](...arguments)
//     }while(res)
//   }
// }

// events EventEmitter
// 当触发此事件时候需要传入name参数，然后监听函数可以获取name参数
// 当事件发生的时候，监听函数反复执行，当监听函数返回true的时候继续循环，返回空的时候的时候结束循环,一般只写一个
let queue = new SyncLoopHook(['name'])
let count = 3
queue.tap('1', function(name) {
  console.log(name, count--)
  if(count) {
    return true
  } else {
    return
  }
})

// 触发事件
queue.call('zx')