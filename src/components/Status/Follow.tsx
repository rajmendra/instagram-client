import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { followUser } from '../../apis/status';
import Loader from '../Common/Loader'

interface FollowingList {
  _id: string;
  followingId: string;
}

interface FollowProps {
  userId: string;
  followingId: string;
  followingList: FollowingList[];
  refetchFollowers: any;
  checkLogin: any;
}

const Follow: React.FC<FollowProps> = ({
  userId,
  followingId,
  followingList,
  refetchFollowers,
  checkLogin
}) => {
  const [isLoading, setLoading] = useState(false);
  const isAlreadyFollowing = followingList.some(
    (item) => item.followingId === followingId,
  );

  
const handleFollow = async (
  loggedInUserId: string,
  followingId: string,
  refetchStatuses: any,
) => {
  try {
    if (!checkLogin()) {
      return;
    }
    setLoading(true);
    await followUser(loggedInUserId, followingId);
    refetchStatuses();
  } catch (error) {
    console.error('Error toggling follow:', error);
  }finally{
    setLoading(false);
  }
};

  return (
    <div>
      <button
        onClick={() => handleFollow(userId, followingId, refetchFollowers)}
      >
        {isLoading ? <Loader/>:  isAlreadyFollowing ? 'Unfollow' : 'Follow'}
      </button>
    </div>
  );
};


export default Follow;
