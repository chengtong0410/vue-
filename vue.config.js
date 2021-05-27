//vue-cli3.0 里面的 vue.config.js做配置
module.exports = {
  publicPath: './',
  devServer: {
    open: true,
    proxy: {
      '/public': {
        //这里最好有一个 /
        target: 'http://autumnfish.cn/heimamm/public', // 后台接口域名
        // target: 'http://127.0.0.1/heimamm/public', // 后台接口域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, //是否跨域
        pathRewrite: {
          '/public': '',
        },
      },
    },
  },
};
