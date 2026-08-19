import { createContext, useContext, useEffect, useState } from 'react';
import { useToast } from './ToastContext';
import { readStorage } from '../utils/helpers';

const AuthContext = createContext(null);
const USERS_KEY = 'shrihari.users';
const USER_KEY = 'shrihari.user';

export function AuthProvider({ children }) {
  const { showToast } = useToast();
  const [user, setUser] = useState(() => readStorage(USER_KEY, null));

  useEffect(() => {
    if (user) window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    else window.localStorage.removeItem(USER_KEY);
  }, [user]);

  const signup = (name, email, password) => {
    const users = readStorage(USERS_KEY, []);
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      showToast('An account with this email already exists', 'error');
      return false;
    }
    const newUser = { name, email, password };
    window.localStorage.setItem(USERS_KEY, JSON.stringify([...users, newUser]));
    setUser({ name, email });
    showToast('Account created. Welcome to Shrihari!', 'success');
    return true;
  };

  const login = (email, password) => {
    const users = readStorage(USERS_KEY, []);
    const match = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (!match || match.password !== password) {
      showToast('Invalid email or password', 'error');
      return false;
    }
    setUser({ name: match.name, email: match.email });
    showToast(`Welcome back, ${match.name}!`, 'success');
    return true;
  };

  const logout = () => {
    setUser(null);
    showToast('You have been logged out', 'info');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, signup, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
