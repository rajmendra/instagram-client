import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Register from './components/Auth/Register';
import Header from './components/Auth/Header';
import Login from './components/Auth/Login';
import StatusList from './components/Status/StatusList';
import { useAuth } from './components/Auth/AuthContext';
import PostStatus from './components/Status/PostStatus';
import EditProfile from './components/Profile/EditProfile';
import './App.css';

const App: React.FC = () => {
  const { loggedInUserId, logout, login } = useAuth();

  useEffect(() => {
    const userId: string | null = localStorage.getItem('userId');
    if (userId) {
      login(userId);
    }
  }, []);

  return (
    <Router>
      <Header loggedInUserId={loggedInUserId} logout={logout} />
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
