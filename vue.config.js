module.exports = {
  // 生产环境对应博讯现有项目路径
  baseUrl: process.env.NODE_ENV === 'production' ? '/stewards/ebiH5' : '/',
  outputDir: 'ebiH5',           // build之后生成的文件夹名称

  productionSourceMap: false,
  css: {
    modules: true,
    extract: process.env.NODE_ENV === 'production',
  },

  // 开发环境中请求的代理，实际环境中，并不会使用到该代理
  devServer: {
    proxy: {
      '/stewards': {
        target: 'http://192.168.1.66:8080/stewards',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/stewards': '/'
        }
      }
    }
  }
};