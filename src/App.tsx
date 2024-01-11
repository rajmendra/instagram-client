import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

import Register from './components/Auth/Register';
import Header from './components/Common/Header';
import Login from './components/Auth/Login';
import StatusList from './components/Status/StatusList';
import { useAuth } from './components/Auth/AuthContext';
import PostStatus from './components/Status/PostStatus';
import EditProfile from './components/Profile/EditProfile';
import { UserProfile } from './interface/user-interfaces';
import { getUserProfile } from './apis/user';
import './App.css';

const App: React.FC = () => {
  const { loggedInUserId, userProfile, setUser, logout, login } = useAuth();

  const userId: string | undefined = Cookies.get('userId');
  useEffect(() => {
    const fetchUserProfile = async () => {
      const userProfile: UserProfile = await getUserProfile(userId);
      setUser(userProfile);
      login(userProfile._id);
    };

    if (userId && userId != null) {
      fetchUserProfile();
    }
  }, [userId]);

  return (
    <Router>
      <Header
        loggedInUserId={loggedInUserId}
        userProfile={userProfile}
        logout={logout}
      />
      <div className="container">
        <Routes>
          <Route path="/" element={<StatusList />} />
          <Route path="/create" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/post" element={<PostStatus />} />
          <Route path="/status-list" element={<StatusList />} />
          <Route path="/edit-profile" element={<EditProfile />} />
        </Routes>
      </div>
      <ToastContainer />
    </Router>
  );
};

export default App;
