import { createContext, useEffect, useState } from "react";
import apiHandler from "../utils/apiHandler";

const AuthContext = createContext();

function AuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [authToken, setAuthToken] = useState(localStorage.getItem("authToken"));
  const [isLoading, setIsLoading] = useState(false);

  function updateToken(token) {
    if (token) {
      localStorage.setItem("authToken", token);
    } else {
      localStorage.removeItem("authToken");
    }

    setAuthToken(token);
  }

  async function getUser() {
    if (!authToken) {
      if (user) {
        setUser(null);
      }

      return;
    }

    try {
      setIsLoading(true);
      const response = await apiHandler.getUser();

      setUser(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      updateToken(null);
    }
  }

  useEffect(() => {
    getUser();
  }, [authToken]);

  return (
    <AuthContext.Provider
      value={{ user, updateToken, isLoading, refetchUser: getUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export { AuthContext, AuthContextProvider };
