document.querySelector('button').addEventListener('click', () => {
  // 实现懒加载
  // webpack里import是一个天然的分割点
  import('./lazy.js').then((nameFun) => {
    let name = nameFun.getName()
    console.log(name)
  })
})