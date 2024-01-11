import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Common.css';

interface HeaderProps {
  loggedInUserId: string | null; // Assuming your user ID is a string
  logout: () => void;
}

const Header: FC<HeaderProps> = ({ loggedInUserId, logout }) => {
  return (
    <div className="header-container">
      <div className="header">
        <h1>Insta Clone</h1>
      </div>
      <div className="nav">
        {!loggedInUserId ? (
          <>
            <Link to="/create" className="nav-item">
              Register
            </Link>
            <Link to="/login" className="nav-item">
           
              Login
            </Link>
          </>
        ) : (
          <>
            <Link to="/status-list" className="nav-item">
          
              Status List
            </Link>
            <Link to="/edit-profile" className="nav-item">
           
              Edit Profile
            </Link>
            <Link to="/post" className="nav-item">
           
              Post New Status
            </Link>
            <div className='logout'>
            <button className="nav-item" onClick={() => logout()}>
              Logout
            </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
