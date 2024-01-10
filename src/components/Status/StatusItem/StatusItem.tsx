import React, { useState, memo } from 'react';
import { toast } from 'react-toastify';

import { postComment, likeStatus, followUser } from '../../../apis/status';
import { useAuth } from '../../Auth/AuthContext';
import 'video-react/dist/video-react.css';
import { Status } from '../../../apis/userInterfaces';
import CommentList from './CommentList';
import ContentSection from './ContentSection';
import UserInfo from './UserInfo';
interface StatusItemProps {
  status: Status;
  refetchStatuses: (id: any) => void; 
  refetchFollowers: () => void;
  followers: any;
}


const ActionButton: React.FC<any> = ({ handleLikeStatus, status }) => (
  <div className="status-actions">
    <button onClick={handleLikeStatus}>Like</button>
    <div>Likes: {status.likes.length}</div>
    <div>Comments: {status.comments.length}</div>
  </div>
);


const StatusItem: React.FC<StatusItemProps> = ({
  status,
  refetchStatuses,
  refetchFollowers, 
  followers,
}) => {
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const { loggedInUserId, login, logout } = useAuth();

  const handleAddComment = async () => {
    try {
      if (!checkLogin() || !newComment.trim()) {
        return;
      }
  
      await postComment(loggedInUserId, status._id, newComment);
      setNewComment('');
      refetchStatuses(false);
    } catch (error: any) {
      toast.error(error);
      console.error('Error adding comment:', error);
    }
  };

  const handleLikeStatus = async () => {
    try {
      if (!checkLogin()) {
        return;
      }
      await likeStatus(loggedInUserId, status._id);
      refetchStatuses(false);
    } catch (error:any) {
      toast.error(error?.response?.data?.error);
      console.error('Error liking status:', error.message);
    }
  };
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
        refetchFollowers={refetchFollowers}
      />
      <ContentSection status={status} />
      <ActionButton handleLikeStatus={handleLikeStatus} status={status} />
      <CommentList
        status={status}
        showAllComments={showAllComments}
        setShowAllComments={setShowAllComments}
        newComment={newComment}
        setNewComment={setNewComment}
        handleAddComment={handleAddComment}
      />
    </div>
  );
};

export default memo(StatusItem);
