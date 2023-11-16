import React, { createContext, useState, ReactNode } from "react";

interface AuthContextProps {
  isAuthenticated: User | null;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<User | null>>;
}

interface User {
  email: string;
  token: string;
  id: string;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}
const userString = localStorage.getItem("user");
const user: User | null = userString ? JSON.parse(userString) : null;

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<User | null>(user);

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
