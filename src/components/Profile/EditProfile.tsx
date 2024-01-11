import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../Auth/AuthContext';
import { updateUser, getUserProfile } from '../../apis/user';
import Button from '../Common/Button'; 
export interface EditUser {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: string;
  email: string;
  bio: string;
}

const EditProfile: React.FC = () => {
  const { loggedInUserId, setUser } = useAuth();
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    bio: '',
    profilePicture: '',
  });
  const [profilePictureUpload, setProfilePictureUpload] = useState<File | null>(
    null,
  );
  const [is_saving, setUploading] = useState(false);
  const navigate = useNavigate();

  const fetchUserProfile = async () => {
    const userProfile: any = await getUserProfile(loggedInUserId);
    setUser(userProfile);
    setFormData({
      username: userProfile.username,
      fullName: userProfile.fullName,
      email: userProfile.email,
      bio: userProfile.bio,
      profilePicture: userProfile.profilePicture,
    });
  };

  useEffect(() => {
    fetchUserProfile();
  }, [loggedInUserId]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setProfilePictureUpload(e.target.files[0]);
    }
  };

  const checkLogin = () => {
    if (!loggedInUserId || loggedInUserId === '') {
      toast.error('Please login fist');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!checkLogin()) {
      return;
    }
    setUploading(true);
    try {
      const data = new FormData();

      // Append text fields to FormData
      data.append('username', formData.username);
      data.append('fullName', formData.fullName);
      data.append('bio', formData.bio);
      data.append('email', formData.email);

      if (profilePictureUpload) {
        data.append('file', profilePictureUpload);
      }

      // Now you can use this formData object for your API call
      await updateUser(loggedInUserId, data);

      toast.success('Profile updated.');
      fetchUserProfile();
      setUploading(false);
      navigate('/');
    } catch (error) {
      console.error('Error updating profile:', error);
      // Handle the error (display an error message, etc.)
    }
  };
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="edit-profile-container">
      <h2>Edit Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Profile Picture:</label>
        {formData.profilePicture && (
          <span
            className="profile-picture"
            style={{ width: '250px', height: '250px' }}
          >
            <img src={formData.profilePicture} alt="Profile" />
          </span>
        )}
        <input type="file" accept="image/*" onChange={handleImageChange} />

        <label>Username:</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleInputChange}
          required
        />

        <label>Full Name:</label>
        <input
          type="text"
          name="fullName"
          value={formData.fullName}
          onChange={handleInputChange}
          required
        />

        <label>Bio:</label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          required
        ></textarea>

  <Button is_saving={is_saving} text="Save Changes" saving_text="Updating..."/>
      </form>
    </div>
  );
};

export default EditProfile;
