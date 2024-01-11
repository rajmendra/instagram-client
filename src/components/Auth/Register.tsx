// Registration.tsx
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { registerUser } from '../../apis/auth';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
import Button from '../Common/Button';
interface FormData {
  username: string;
  password: string;
  fullName: string;
  email: string;
  bio: string;
}

interface ApiResponse {
  [x: string]: any;
  data: {
    error: string;
  };
}

const Registration: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    password: '',
    fullName: '',
    email: '',
    bio: '',
  });
  const [is_saving, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setUploading(true);
    try {
      const response = await registerUser(formData);
      console.log('Registration successful:', response.message);
      toast.success('Registration successful');
      navigate('/login');

      setUploading(false);
    } catch (error) {
      setUploading(false);
      handleRegistrationError(error);
    }
  };

  const handleRegistrationError = (error: any) => {
    toast.error('Unexpected registration error');
    console.error('Unexpected registration error:', error);
  };

  return (
    <div>
      <h2>Registration</h2>
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

        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          onChange={handleInputChange}
          required
        />

        <label>Email:</label>
        <input
          type="email"
          name="email"
          onChange={handleInputChange}
          required
        />

        <label>Bio:</label>
        <textarea name="bio" onChange={handleInputChange}></textarea>
        <Button is_saving={is_saving} text="Register" saving_text="Saving..." />
      </form>
    </div>
  );
};

export default Registration;
