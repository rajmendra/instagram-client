import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import './Common.css';
import { UserProfile } from '../../interface/user-interfaces';

interface HeaderProps {
  userProfile: UserProfile;
  loggedInUserId: string | null; // Assuming your user ID is a string
  logout: () => void;
}

const Header: FC<HeaderProps> = ({ userProfile, loggedInUserId, logout }) => {
  const {
    profilePicture = '',
    fullName = '',
    bio = '',
    email = '',
    followerCount = 0,
  } = userProfile || {};
  return (
    <div className="header-container">
      <div className="header">
        <h1>Insta Clone</h1>
      </div>
      {loggedInUserId && (
        <>
          <div className="nav">
            {profilePicture && (
              <span
                className="profile-picture"
                style={{ width: '150px', height: '150px' }}
              >
                <span>
                  <img src={profilePicture} alt="Profile" />
                </span>
              </span>
            )}
          </div>
          <div className="nav name">
            <h3>
              <b>{fullName}</b>
            </h3>
          </div>
          <div className="user-detail">
            {followerCount !== 0 ? `${followerCount} Followers` : ''}
          </div>
          <div className="user-detail">{bio}</div>
          <div className="user-detail last-row">{email}</div>
        </>
      )}
      {!loggedInUserId ? (
        <>
          <div className="nav">
            <Link to="/create" className="nav-item">
              Register
            </Link>
          </div>
          <div className="nav">
            <Link to="/login" className="nav-item">
              Login
            </Link>
          </div>
        </>
      ) : (
        <>
          {' '}
          <div className="nav">
            <Link to="/status-list" className="nav-item">
              Status List
            </Link>{' '}
          </div>
          <div className="nav">
            <Link to="/edit-profile" className="nav-item">
              Edit Profile
            </Link>{' '}
          </div>
          <div className="nav">
            <Link to="/post" className="nav-item">
              Post New Status
            </Link>{' '}
          </div>
          <div className="nav">
            <div className="logout">
              <button className="nav-item" onClick={() => logout()}>
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
