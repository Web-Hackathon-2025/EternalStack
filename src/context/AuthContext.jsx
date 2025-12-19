import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  // Mock User State
  // Role can be 'Admin' or 'User'
  const [user, setUser] = useState({
    name: 'Admin User',
    role: 'Admin', // Default to Admin for development
    email: 'admin@karigar.com'
  });

  const login = (role = 'Admin') => {
    setUser({
      name: role === 'Admin' ? 'Admin User' : 'Standard User',
      role: role,
      email: `${role.toLowerCase()}@karigar.com`
    });
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
