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
  chainWebpack: config => {
    // 移除 prefetch 插件
    config.plugins.delete('prefetch')
    // 移除 preload 插件
    config.plugins.delete('preload');
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
