export default ({app, router, Vue}) => {
    console.log('TITULO')
    router.beforeEach((to, from, next) => {
      document.title = `${to.meta.title} | SGC`
      next()
    })
  }
  