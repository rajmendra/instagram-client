import React, { Suspense, lazy } from 'react';
import Follow from '../Follow';
const LazyImage = lazy(() => import('../../Common/LazyImage'));
const UserInfo: React.FC<any> = ({
  status,
  loggedInUserId,
  followers,
  refetchFollowers,
}) => (
  <div className="user-info">
    <span className="profile-picture" style={{ width: '80px', height: '80px' }}>
    <Suspense>
              <LazyImage src={status.postedBy.profilePicture} alt="User" />
            </Suspense>
    </span>
    <div className="user-details">
      <h2>{status.postedBy.fullName}</h2>
      <div>
        {status.postedBy.followerCount
          ? `${status.postedBy.followerCount} followers`
          : 'No followers'}{' '}
      </div>
    </div>
    <div className="follow-button-container">
      {loggedInUserId !== status.postedBy._id && (
        <Follow
          userId={loggedInUserId}
          followingId={status.postedBy._id}
          followingList={followers}
          refetchFollowers={refetchFollowers}
        />
      )}
    </div>
  </div>
);

export default UserInfo;
