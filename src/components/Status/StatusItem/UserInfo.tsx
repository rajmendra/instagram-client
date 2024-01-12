import React, { Suspense, lazy } from 'react';
import { formatDistanceToNow } from 'date-fns';
import Follow from '../Follow';
const LazyImage = lazy(() => import('../../Common/LazyImage'));
const UserInfo: React.FC<any> = ({
  status,
  loggedInUserId,
  followers,
  refetchFollowers,
  checkLogin,
}) => (
  <div className="userinfo-row">
    <div className='userinfo-col'>
    <span className="profile-picture" style={{ width: '80px', height: '80px' }}>
      <Suspense>
        <LazyImage src={status.postedBy.profilePicture} alt="User" />
      </Suspense>
    </span>
    </div>
    <div className="userinfo-col user-details">
      <h2>{status.postedBy.fullName}</h2>
      <div>
        {status.postedBy.followerCount
          ? `${status.postedBy.followerCount} followers`
          : 'No followers'}{' '} 
          <div className="comment-date">
          {formatDistanceToNow(new Date(status.createdAt), {
            addSuffix: true,
          })}
        </div>
      </div>
    </div>
    <div className="userinfo-col follow-button-container">
      {loggedInUserId !== status.postedBy._id && (
        <Follow
          userId={loggedInUserId}
          followingId={status.postedBy._id}
          followingList={followers}
          refetchFollowers={refetchFollowers}
          checkLogin={checkLogin}
        />
      )}
    </div>
  </div>
);

export default UserInfo;
