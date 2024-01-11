import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../../interface/user-interfaces';
interface AuthContextProps {
  loggedInUserId: string;
  userProfile: UserProfile;
  setUser: (user: UserProfile) => void;
  login: (userId: string) => void;
  logout: () => void;
}

const AuthContext = createContext<any>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState<any>(false);
  const [userProfile, setUserProfile] = useState<UserProfile>();

  const setUser = (user: UserProfile) => {
    console.log('user', user);
    setUserProfile(user);
  };

  const login = (userId: string) => {
    console.log('userId', userId);
    setLoggedInUserId(userId);
  };

  const logout = () => {
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    setLoggedInUserId(false);
  };
  const userId: string | null = localStorage.getItem('userId');
  return (
    <AuthContext.Provider
      value={{ loggedInUserId: userId, userProfile, login, logout, setUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
