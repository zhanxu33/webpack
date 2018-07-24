class AsyncPlugin{
  // 插件的执行是异步的，异步，代码执行完以后要调callback
  apply(compiler) {
    compiler.hooks.emit.tapAsync('Emit', function(compilation, callback){
      setTimeout(() => {
        console.log(compilation)
        callback()
      }, 1000)
    })
  }
}

module.exports = AsyncPlugin