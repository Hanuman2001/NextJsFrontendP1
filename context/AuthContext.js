import { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setuser] = useState(null);

  const [error, setError] = useState(null);

  //register

  const register = async (user) => {
    console.log(user);
  };
  //login

  const login = async ({ email: identifier, password }) => {
    console.log({ identifier, password });
  };

  //logout

  const logout = async (user) => {
    console.log("logout");
  };

  //check if user loggedin
  const checkifuserLoggedIn = async (user) => {
    console.log("Check");
  };
  return (
    <AuthContext.Provider value={{ register, login, logout, user, error }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
