import _fetch from './serve';
// 定义接口请求方法
function getPhoneCode(data) {
  return _fetch({
    url: '/sendsms',
    method: 'post',
    data: data,
  });
}
// 定义一个注册api方法
function toRegister(data) {
  return _fetch({
    url: '/register',
    method: 'post',
    // params:data
    data, // data:data
  });
}

// export default { getPhoneCode }
export { getPhoneCode, toRegister };
