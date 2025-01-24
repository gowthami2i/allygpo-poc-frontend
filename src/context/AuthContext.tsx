import React, { createContext, useState } from "react";

type AuthContextType = {
  isAuthenticated: boolean;
  setIsAuthenticated?:any;
  login: () => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Login function to set authentication state
  const login = () => setIsAuthenticated(true);

  // Logout function to reset authentication state
  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the AuthContext
// export const useAuth = () => {
//   const context = useContext(AuthContext);


//   return context;
// };
