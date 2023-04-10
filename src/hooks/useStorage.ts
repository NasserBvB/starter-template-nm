// Create hook to take a token and return the storage object
// Path: src/hooks/useStorage.ts
export const useStorage = (token: string) => {

  const setToken = (value: string) => {
    localStorage.setItem(token, value);
  }

  const getToken = () => {
    return localStorage.getItem(token);
  }

  const removeToken = () => {
    localStorage.removeItem(token);
  }

  return {
    setToken,
    getToken,
    removeToken,
  }

}