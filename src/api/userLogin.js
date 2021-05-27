import _fetch from '../api/serve';
export const getLogin = (params) => {
  return _fetch({
    url: '/login',
    method: 'post',
    data: params,
  });
};
