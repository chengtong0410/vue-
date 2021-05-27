// 在该文件写该模块接口调用
import axios from 'axios';
// 导入message
import { Message } from 'element-ui';
import { getLocal, removeLocal } from '@/utils/local.js';
// 导入路由
import router from '@/router/index.js';
// 创建一个axios副本(修改了axios的一些默认属性的一个新的axios)
let _fetch = axios.create({
  //修改一些默认属性
  baseURL: process.env.VUE_APP_URL,
  //   跨域带cookie到后端
  withCredentials: true,
});

// 添加请求拦截器
_fetch.interceptors.request.use(
  function(config) {
    // 在发送请求之前做些什么
    // 统一在请求拦截加上请求头
    config.headers.token = getLocal('token');
    // window.console.log('请求拦截:', config)
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
_fetch.interceptors.response.use(
  function(response) {
    // 对响应数据做点什么
    if (response.data.code == 200) {
      return response;
    } else if (response.data.code == 206) {
      // token错误,要么token失效   非法调用   回至登陆页(1:清除token2:跳转至登陆页)
      removeLocal('token');
      Message.error(response.data.message);
      // router===this.$router
      router.push('/login');
      // 不让axios调用执行.then,直接执行.catch
      return Promise.reject(response.data.message);
      // this.$router.push('/login')  this.$router  ===router实例化对象
    } else {
      //   提示一下
      //   如果response.data.code 不是200我们不希望.then执行,应该执行.catch
      // message使用
      Message.error(response.data.message);
      //   alert(response.data.message)
      //   不执行axios的.then,直接跳到.catch执行
      return Promise.reject(response.data.message);
    }
  },
  function(error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);

export default _fetch;
