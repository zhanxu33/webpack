const { Tapable, SyncHook } = require('tapable')
let t = new Tapable()
t.hooks = {
  myhook: new SyncHook()
}
// 监听SyncHook这个钩子
let called = 0
// 4.0以前的写法
// t.plugin('myhook', () => called++)
// t.hooks.myhook.call()
// t.plugin('myhook', () => called += 10)
// t.hooks.myhook.call()
// 新的写法
t.hooks.myhook.tap('1', () => called += 10)
t.hooks.myhook.call()
console.log(called)