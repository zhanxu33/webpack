// esprima：把代码变成抽象语法树 estraverse：改变抽象语法树 escodegen：生成代码
let esprima = require('esprima')
let estraverse = require('estraverse')
let escodegen = require('escodegen')
let code = "function ast() {}"
let ast = esprima.parse(code)
estraverse.traverse(ast, {
  enter(node) {
    console.log('enter', node)
    if (node.type == 'Identifier') {
      node.name += 'enter'
    }
  },
  leave(node) {
    console.log('leave', node)
    if (node.type == 'Identifier') {
      node.name += 'leave'
    }
  }
})
let newcode = escodegen.generate(ast)
console.log(newcode)