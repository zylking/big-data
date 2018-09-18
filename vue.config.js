module.exports = {
  baseUrl: '/',
  devServer: {
    proxy: {
      '/api': {
        target: 'http://192.168.1.66:8002/stewards',
        ws: true,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '/'
        }
      }
    }
  }
};