import React, { createContext, useContext, useState, useCallback } from 'react';
import type { Role } from '@/domain/types';

interface AuthState {
  isAuthenticated: boolean;
  role: Role | null;
  userName: string;
}

interface AuthContextType extends AuthState {
  login: (role: Role) => void;
  logout: () => void;
  switchRole: (role: Role) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    role: null,
    userName: '',
  });

  const login = useCallback((role: Role) => {
    setState({
      isAuthenticated: true,
      role,
      userName: role === 'team-lead' ? 'Jordan Mitchell' : 'Alex Chen',
    });
  }, []);

  const logout = useCallback(() => {
    setState({ isAuthenticated: false, role: null, userName: '' });
  }, []);

  const switchRole = useCallback((role: Role) => {
    setState(prev => ({ ...prev, role, userName: role === 'team-lead' ? 'Jordan Mitchell' : 'Alex Chen' }));
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout, switchRole }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};
