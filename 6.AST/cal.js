let code = `const res = 1000 * 60 * 60* 24`
let types = require('babel-types')
let babel = require('babel-core')
// 预计算
let visitor = {
  BinaryExpression(path) {
    let node = path.node
    if (!isNaN(node.left.value) && !isNaN(node.right.value)) {
      let result = eval(node.left.value + node.operator + node.right.value)
      result = types.numericLiteral(result)
      path.replaceWith(result)
      // 进行递归计算
      if (path.parentPath.node.type == 'BinaryExpression') {
        visitor.BinaryExpression.call(null, path.parentPath)
      }
    }
  }
}

let r = babel.transform(code, {
  plugins: [
    { visitor }
  ]
})

console.log(r.code)