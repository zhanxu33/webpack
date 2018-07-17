// babel核心库，用来实现核心的转换引擎
let babel = require('babel-core')
// 实现类型，生成AST零部分
let types = require('babel-types')

let code = `let sum = (a, b) => a + b`
// 这个访问者，可以对特定类型的节点进行处理
let visitor = {
  // 处理2次的写法
  // ArrowFunctionExpression: {
  //   enter() {},
  //   leave(){}
  // }
  // 处理一次
  ArrowFunctionExpression(path) {
    // path是路径，path.node才是节点
    let params = path.node.params
    let body = types.blockStatement([
      types.returnStatement(path.node.body)
    ])
    let fun = types.functionExpression(null, params, body, false, false)
    path.replaceWith(fun)
  }
}
let arrayPlugin = { visitor }
// babel内部先把代码转成AST，然后进行遍历
let res = babel.transform(code, {
  plugins: [
    arrayPlugin
  ]
})
console.log(res.code)