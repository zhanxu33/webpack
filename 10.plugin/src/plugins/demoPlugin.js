class demoPlugin {
  constructor(options) {
    console.log(options)
    this.options = options
  }
  apply(compiler) {
    // compiler启动一次新的编译
    // compiler有很多hooks，可以根据需求注册不同的hooks
    compiler.hooks.compilation.tap('compilation', function(compilation, params) {
      compilation.hooks.optimizeChunkModules.tap('optimizeChunkModules', function(chunks, modules) {
        console.log(params, chunks, modules)
      })
    })
  }
}
module.exports = demoPlugin