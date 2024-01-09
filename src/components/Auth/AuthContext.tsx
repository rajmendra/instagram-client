import React, { createContext, useContext, useState, ReactNode } from 'react'

interface AuthContextProps {
  loggedInUserId: string
  login: (userId: string) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined)

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [loggedInUserId, setLoggedInUserId] = useState<string>('')

  const login = (userId: string) => {
    setLoggedInUserId(userId)
  }

  const logout = () => {
    setLoggedInUserId('')
  }

  return (
    <AuthContext.Provider value={{ loggedInUserId, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
