// Login.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react'
import { toast } from 'react-toastify'
import { loginUser } from '../../apis/auth'
import { useAuth } from './AuthContext'
import { useNavigate } from 'react-router-dom'

interface FormData {
  username: string
  password: string
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  })
  const { loggedInUserId, login, logout } = useAuth()
  const navigate = useNavigate()

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    try {
      const response = await loginUser(formData)
      const { userId, token } = response
      localStorage.setItem('userId', userId)
      localStorage.setItem('token', token)
      login(userId)
      navigate('/status-list')
    } catch (error) {
      toast.error('User name and password is not correct.')
    }
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label>Username:</label>
        <input
          type="text"
          name="username"
          onChange={handleInputChange}
          required
        />

        <label>Password:</label>
        <input
          type="password"
          name="password"
          onChange={handleInputChange}
          required
        />

        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
