export const getLocal = (key) => {
  return localStorage.getItem(key);
};
export const removeLocal = (key) => {
  return localStorage.removeItem(key);
};
export const setLocal = (key, val) => {
  return localStorage.setItem(key, val);
};
