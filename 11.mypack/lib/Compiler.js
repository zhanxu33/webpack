const { SyncHook } = require('tapable')
// 生成语法树
const esprima = require('esprima')
// 遍历语法树
const estraverse = require('estraverse')
// 生成新代码
const escodegen = require('escodegen')
const path = require('path')
const fs = require('fs')
class Compiler{
  constructor(options) {
    this.options = options
    this.hooks = {
      entryOption: new SyncHook(['config']),
      afterPlugins: new SyncHook(['config'])
    }
    let plugins = options.plugins || []
    // 挂载插件
    plugins.forEach(plugin => {
      plugin.apply(this)
    })
    // 触发插件挂载完成事件
    this.hooks.afterPlugins.call(this)
  }
  // 找到入口文件进行编译
  run() {
    let { entry, output:{ path: dist, filename } } = this.options
    let root = process.cwd()
    // 入口文件的绝对路径
    let entryPath = path.join(root, entry)
    // 存放所有的模块
    let modules = []
    let res = parseModule(entryPath)
    function parseModule(modulePath) {
      let source = fs.readFileSync(modulePath, 'utf8')
      // 从root找到modulePath的相对路径
      let parentPath = path.relative(root, modulePath)
      // 执行loader转换
      // path.dirname 该文件或者文件夹所在的目录
      let result = parse(source, path.dirname(parentPath))
      modules['./' + parentPath] = result.source
    }
    function parse(source, parentPath) {
      // 生成抽象语法树
      let ast = esprima.parse(source)
      let requires = []
      // 遍历抽象语法树，1.找到此模块依赖的模块 2.替换老的加载路径
      estraverse.replace(ast, {
        enter(node, parent) {
          if(node.type == 'CallExpression' && node.callee.name == 'require') {
            // 原模块路径
            let name = node.arguments[0].value
            name += (name.lastIndexOf('.') > 0 ? '' : '.js')
            // 拼接路径
            let moduleId = './' + path.join(parentPath, name)
            requires.push(moduleId)
            node.arguments = [{ type: 'Literal', value: moduleId }]
            return node
          }
        }
      })
      source = escodegen.generate(ast)
      return { requires, source }
    }
    // 取得入口文件的文件内容
    let source = fs.readFileSync(res, 'utf8')
  }
}
module.exports = Compiler