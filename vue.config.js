module.exports = {
  baseUrl: '/stewards',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.66:8080/stewards', //http://www.ebi365.com/stewards',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};