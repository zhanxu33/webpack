let base = require('./base.js')
document.getElementById('app').innerHTML = base()

// HotModuleReplacementPlugin会向module注入一个hot字段
if(module.hot) {
  // 如果检测到了下面的更新，执行后面的function，这个热更新会冒泡（根据JS的引用路径），都不处理会刷新浏览器
  module.hot.accept('./base.js', function() {
    let base = require('./base.js')
    document.getElementById('app').innerHTML = base()
  })
}