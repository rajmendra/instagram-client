// Login.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { loginUser } from '../../apis/auth'; 
import { useAuth } from './AuthContext';
import Button from '../Common/Button'; 

interface FormData {
  username: string;
  password: string;
}

const Login: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
  });
  const [is_saving, setLoader] = useState(false);
  const { loggedInUserId, login, logout } = useAuth();
  const navigate = useNavigate();

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoader(true);
    try {
      const response = await loginUser(formData);
      const { userId, token } = response;
      localStorage.setItem('userId', userId);
      localStorage.setItem('token', token);
      login(userId);
      setLoader(false);
      navigate('/status-list');
    } catch (error) {
      setLoader(false);
      toast.error('User name and password is not correct.');
    }
  };

  return (
    <div>
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
        <Button is_saving={is_saving} text="Login" saving_text="Login in..."  />
      </form>
    </div>
  );
};

export default Login;
