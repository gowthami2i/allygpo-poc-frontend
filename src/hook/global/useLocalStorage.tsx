const useLocalStorage = () => {
  const setItem = (key: string, value: any) => {
    localStorage.setItem(key, JSON.stringify(value));
  };

  const getItem = (key: string) => {
    const item = localStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    }
    return null;
  };

  const removeItem = (key: string) => {
    localStorage.removeItem(key);
  };

  const clearAll = () => localStorage.clear();

  return { getItem, setItem, removeItem, clearAll };
};

export default useLocalStorage;
