let { AsyncParallelHook } = require('tapable')

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
let queue = new AsyncParallelHook(['name'])
console.time('cost')
// 异步并发执行
// queue.tap('1', function(name) {
//   console.log(1, name)
// })

// queue.tap('2', function(name) {
//   console.log(2, name)
// })

// queue.tap('3', function(name) {
//   console.log(3, name)
// })

// queue.tapAsync('1', function(name, cb) {
//   setTimeout(() => {
//     console.log(1, name)
//     // 表示异步执行完
//     cb()
//   }, 1000)
// })

// queue.tapAsync('2', function(name, cb) {
//   setTimeout(() => {
//     console.log(2, name)
//     cb()
//   }, 1000)
// })

// queue.tapAsync('3', function(name, cb) {
//   setTimeout(() => {
//     console.log(3, name)
//     cb()
//   }, 1000)
// })
// // 异步没有call方法，有callAsync
// queue.callAsync('zx', () => {
//   console.log('over')
//   console.timeEnd('cost')
// })

queue.tapPromise('1', function(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(1, name)
      // 表示这个事件成功
      resolve()
    }, 1000)
  })
})

queue.tapPromise('2', function(name, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(2, name)
      // 表示这个事件成功
      resolve()
    }, 1000)
  })
})

queue.tapPromise('3', function(name, cb) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log(3, name)
      // 表示这个事件成功
      resolve()
    }, 1000)
  })
})
queue.promise('zx').then(() => {
  console.log('over')
  console.timeEnd('cost')
}, () => {
  console.log('dead')
  console.timeEnd('cost')
})

// AsyncParallelBailHook 一个中断了，后面的就都不执行啦