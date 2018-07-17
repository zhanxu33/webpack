let babel = require('babel-core')
let types = require('babel-types')
// 只会处理ImportDeclaration
let visitor = {
  ImportDeclaration(path, ref = {opts: {}}) {
    let node = path.node
    let specifiers = node.specifiers
    if (ref.opts.library == node.source.value && !types.isImportDefaultSpecifier(specifiers[0])) {
      let newImportSpecifiers =  specifiers.map(x => {
        types.importDeclaration(types.importDefaultSpecifier(x.local), 
          types.stringLiteral(`${node.source.value}/${x.local.name}`))
      })
      path.replaceWithMultiple(newImportSpecifiers)
    }
  }
}

let code = "import {a,b} from 'abc'"
let res = babel.transform(code, {
  plugins: [
    { visitor }
  ]
})
console.log(res.code)