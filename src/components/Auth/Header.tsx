import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

interface HeaderProps {
  loggedInUserId: string | null; // Assuming your user ID is a string
  logout: () => void;
}

const Header: FC<HeaderProps> = ({ loggedInUserId, logout }) => {
  return (
    <div>
      <div className="menu-container">
        <div className="header">
          <h1>Insta Clone</h1>
        </div>
        <div className="row">
          {!loggedInUserId && (
            <>
              <div className="column">
                <Link to="/create">Register</Link>
              </div>
              <div className="column">
                <Link to="/login">Login</Link>
              </div>
            </>
          )}

          {loggedInUserId && (
            <>
              <div className="column">
                <Link to="/status-list">Status List</Link>
              </div>
              <div className="column">
                <Link to="/edit-profile">Edit Profile</Link>
              </div>
              <div className="column">
                <Link to="/post">Post New Status</Link>
              </div>
              <div className="column">
                <a href="#" onClick={() => logout()}>
                  Logout
                </a>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
