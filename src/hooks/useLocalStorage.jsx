export const useLocalStorage = (key) => {
  const setItem = (value) => {
    const temp = JSON.stringify(value);
    window.localStorage.setItem(key, temp);
  };
  const getItem = (key) => {
    const value = window.localStorage.getItem(key);
    return JSON.parse(value);
  };
  const removeItem = (key) => {
    return window.localStorage.removeItem(key);
  };
  return { setItem, getItem, removeItem };
};
