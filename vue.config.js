module.exports = {
  publicPath: './',
  devServer: {
    proxy: {
      '/api': {
        target: process.env.VUE_APP_DEV_API_URL,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  },
  css: {
    // 共享全局css变量
    loaderOptions: {
      scss: {
        prependData: `@import "~@/style/scss.scss";`
      }
    }
  }
}
