import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const initialAuthUser = JSON.parse(localStorage.getItem("Users")) || null;
  const [authUser, setAuthUser] = useState(initialAuthUser);

  useEffect(() => {
    if (authUser) {
      localStorage.setItem("Users", JSON.stringify(authUser));
    } else {
      localStorage.removeItem("Users");
    }
  }, [authUser]);

  const login = (userData) => {
    setAuthUser(userData);
  };

  const logout = () => {
    setAuthUser(null);
  };

  return (
    <AuthContext.Provider value={[authUser, setAuthUser, login, logout]}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}