import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isStandalone, setIsStandalone] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  useEffect(() => {
    const verifyToken = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await fetch(`${API_URL}/auth/profile`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        const data = await response.json();
        if (data.success) {
          setAdmin(data.admin);
          setIsStandalone(false);
        } else {
          logout();
        }
      } catch (err) {
        console.warn('Backend connection failed. Running AuthContext in Standalone Mock mode.');
        // Verify mock standalone token
        if (token === 'standalone_mock_token_lumina') {
          setAdmin({ id: 'mock_admin_1', username: 'Lumina Concierge', email: 'admin@luminalive.com' });
          setIsStandalone(true);
        } else {
          logout();
        }
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      const data = await response.json();
      if (data.success) {
        setToken(data.token);
        setAdmin(data.admin);
        localStorage.setItem('admin_token', data.token);
        setIsStandalone(false);
        return { success: true };
      } else {
        return { success: false, message: data.message };
      }
    } catch (err) {
      console.warn('Backend down during login, checking local standalone credentials.');
      // Local client fallback
      if (email === 'admin@luminalive.com' && password === 'admin123') {
        const mockToken = 'standalone_mock_token_lumina';
        setToken(mockToken);
        setAdmin({ id: 'mock_admin_1', username: 'Lumina Concierge', email });
        localStorage.setItem('admin_token', mockToken);
        setIsStandalone(true);
        return { success: true, message: 'LoggedIn via Client Standalone Mode.' };
      }
      return { success: false, message: 'Server is offline and invalid fallback credentials.' };
    }
  };

  const logout = () => {
    setToken(null);
    setAdmin(null);
    localStorage.removeItem('admin_token');
  };

  return (
    <AuthContext.Provider value={{ token, admin, loading, login, logout, isStandalone, API_URL }}>
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
