import React, { useState, memo } from 'react';
import { toast } from 'react-toastify';

import { postComment, likeStatus } from '../../../apis/status';
import { useAuth } from '../../Auth/AuthContext';
import CommentList from './CommentList';
import ContentSection from './ContentSection';
import UserInfo from './UserInfo';
import Like from './Like';
import { Status } from '../../../interface/status-interfaces';

interface StatusItemProps {
  status: Status;
  refetchStatuses: (value: any) => void;
  refetchFollowers: () => void;
  followers: any;
  likes: any;
}


const StatusItem: React.FC<StatusItemProps> = ({
  status,
  refetchStatuses,
  refetchFollowers,
  followers,
  likes
}) => {
  const { loggedInUserId } = useAuth();

  const checkLogin = () => {
    if (!loggedInUserId || loggedInUserId === '') {
      toast.error('Please log in first');
      return false;
    }

    return true;
  };

  return (
    <div className="status-item">
      <UserInfo
        status={status}
        loggedInUserId={loggedInUserId}
        followers={followers}
        checkLogin={checkLogin}
        refetchFollowers={refetchFollowers}
      />
      <ContentSection status={status} />
      <Like likes={likes} loggedInUserId={loggedInUserId} checkLogin={checkLogin} status={status} refetchStatuses={refetchStatuses} 
        refetchFollowers={refetchFollowers}/>
      <CommentList
        status={status}
        checkLogin={checkLogin}
        loggedInUserId={loggedInUserId}
        refetchStatuses={refetchStatuses}
      />
    </div>
  );
};

export default memo(StatusItem);
