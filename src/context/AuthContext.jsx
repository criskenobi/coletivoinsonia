import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    try {
      const storedAuth = localStorage.getItem('adminAuth');
      if (storedAuth) {
        const authData = JSON.parse(storedAuth);
        setIsAuthenticated(true);
        setCurrentUser(authData);
      }
    } catch (error) {
      console.error("Error reading from localStorage:", error);
    }
  }, []);

  const login = (username, password) => {
    if (username === 'admin' && password === 'insonia2026') {
      const userData = { username, role: 'admin' };
      try {
        localStorage.setItem('adminAuth', JSON.stringify(userData));
        setIsAuthenticated(true);
        setCurrentUser(userData);
        return { success: true };
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        return { success: false, error: 'Erro ao salvar sessão' };
      }
    }
    return { success: false, error: 'Credenciais inválidas' };
  };

  const logout = () => {
    try {
      localStorage.removeItem('adminAuth');
    } catch (error) {
      console.error("Error clearing localStorage:", error);
    }
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, currentUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};