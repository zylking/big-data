module.exports = {
  baseUrl: '/stewards',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://www.ebi365.com/stewards',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};