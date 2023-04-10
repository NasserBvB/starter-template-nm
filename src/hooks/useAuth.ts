import { useStorage } from "@hooks/useStorage";
import fetchApi from "@utils/fetch";

export const useAuth = () => {

  const { getToken, removeToken, setToken } = useStorage('user-token');


  const login = async (email: string, password: string) => {
    const {response, error} = await fetchApi('http://localhost:3000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    if (error) {
      // Handle error
      return
    }
    console.log(response);
    
    // Handle success
    setToken(response.token);
  }

  const register = async (email: string, password: string, fullName: string) => {
    const {response, error} = await fetchApi('http://localhost:3000/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, fullName }),
    })

    if (error) {
      // Handle error
      return
    }

    // Handle success
    console.log(response);
    
  }

  const resetPassword = async (email: string) => {
    const {response, error} = await fetchApi('http://localhost:3000/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    })

    if (error) {
      // Handle error
      return
    }

    // Handle success
    console.log(response);
  }

  const changePassword = async (newPassword: string, changePasswordToken: string) => {
    const {response, error} = await fetchApi('http://localhost:3000/api/auth/change-password', {
      method: 'POST',
      body: JSON.stringify({ password: newPassword, token: changePasswordToken }),
    })

    if (error) {
      // Handle error
      return
    }

    // Handle success
    console.log(response);
  }

  const isAuthenticated = () => {
    const token = getToken();
    return token ? true : false;
  }

  const logout = () => {
    removeToken();
  }

  return {
    isAuthenticated,
    logout,
    login,
    register,
    resetPassword,
    changePassword,
  }

}