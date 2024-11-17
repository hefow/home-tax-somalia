import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Check for active sessions on other tabs/windows
  useEffect(() => {
    const checkOtherSessions = (e) => {
      if (e.key === 'auth_session' && e.newValue) {
        const newSession = JSON.parse(e.newValue);
        if (newSession.timestamp > (user?.timestamp || 0)) {
          setUser(newSession);
        }
      }
    };

    window.addEventListener('storage', checkOtherSessions);
    return () => window.removeEventListener('storage', checkOtherSessions);
  }, [user]);

  // Initialize auth state
  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('user');
      const lastActivity = localStorage.getItem('lastActivity');

      if (token && savedUser) {
        const userData = JSON.parse(savedUser);
        const inactiveTime = Date.now() - parseInt(lastActivity || 0);
        
        // Auto logout after 30 minutes of inactivity
        if (inactiveTime > 30 * 60 * 1000) {
          logout();
        } else {
          setUser(userData);
          updateLastActivity();
        }
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  // Track user activity
  const updateLastActivity = () => {
    localStorage.setItem('lastActivity', Date.now().toString());
  };

  useEffect(() => {
    const events = ['mousedown', 'keydown', 'scroll', 'touchstart'];
    events.forEach(event => {
      window.addEventListener(event, updateLastActivity);
    });

    return () => {
      events.forEach(event => {
        window.removeEventListener(event, updateLastActivity);
      });
    };
  }, []);

  const login = async (userData) => {
    const sessionData = {
      ...userData,
      timestamp: Date.now(),
      isActive: true
    };

    setUser(sessionData);
    localStorage.setItem('token', userData.token);
    localStorage.setItem('user', JSON.stringify(sessionData));
    localStorage.setItem('auth_session', JSON.stringify(sessionData));
    updateLastActivity();
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('auth_session');
    localStorage.removeItem('lastActivity');
    navigate('/login');
  };

  const isAuthenticated = () => {
    return !!user;
  };

  const isAdmin = () => {
    return user?.role === 'admin';
  };

  const value = {
    user,
    login,
    logout,
    isAuthenticated,
    isAdmin,
    loading
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
