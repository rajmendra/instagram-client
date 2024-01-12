import React, { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
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
    setUserProfile(user);
  };

  const login = (userId: string) => {
    setLoggedInUserId(userId);
  };

  const logout = () => {
    Cookies.remove('userId');
    Cookies.remove('token');
    setLoggedInUserId(false);
  };
  const userId: string | undefined = Cookies.get('userId');
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
