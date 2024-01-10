import React, { useState } from 'react';
import { Player } from 'video-react';
import { postComment, likeStatus, followUser } from '../../apis/status';
import { useAuth } from './../Auth/AuthContext';
import { formatDistanceToNow } from 'date-fns';
import 'video-react/dist/video-react.css';
import { Status } from '../../apis/userInterfaces';
import Follow from './Follow';
import { toast } from 'react-toastify';
interface StatusItemProps {
  status: Status;
  refetchStatuses: () => void;
  followers: any;
}
const UserInfo: React.FC<any> = ({
  status,
  loggedInUserId,
  followers,
  refetchStatuses,
}) => (
  <div className="user-info">
    <img
      src={status.postedBy.profilePicture}
      alt="User"
      className="profile-picture-post"
    />
    <div className="user-details">
      <h2>{status.postedBy.fullName}</h2>
    </div>
    <div className="follow-button-container">
      {loggedInUserId !== status.postedBy._id && (
        <Follow
          userId={loggedInUserId}
          followingId={status.postedBy._id}
          followingList={followers}
          refetchStatuses={refetchStatuses}
        />
      )}
    </div>
  </div>
);

const CommetItem: React.FC<any> = ({ comment, index }) => (
  <li key={index}>
    <div>
      <img
        className="profile-picture-comment"
        src={comment.userId?.profilePicture}
        alt="User"
      />
    </div>
    <div className="comment">{comment.content}</div>
    <div>
      {comment.createdAt && (
        <span className="comment-date">
          {formatDistanceToNow(new Date(comment.createdAt), {
            addSuffix: true,
          })}
        </span>
      )}
    </div>
  </li>
);
const Content: React.FC<any> = ({ status }) => (
  <p>
    {status.type === 'text' && <span>{status.content} </span>}
    {status.type === 'image' && (
      <img width="100%" src={status.content} alt="Status" />
    )}
    {status.type === 'video' && (
      <Player>
        <source src={status.content} />
      </Player>
    )}
  </p>
);

const ActionButton: React.FC<any> = ({ handleLikeStatus, status }) => (
  <div className="status-actions">
    <button onClick={handleLikeStatus}>Like</button>
    <div>Likes: {status.likes.length}</div>
    <div>Comments: {status.comments.length}</div>
  </div>
);

const CommentList: React.FC<any> = ({
  status,
  showAllComments,
  setShowAllComments,
  newComment,
  setNewComment,
  handleAddComment,
}) => (
  <div className="comments">
    <ul>
      {status.comments
        .slice(0, showAllComments ? undefined : 1)
        .map((comment: any, index: any) => (
          <CommetItem key={index} comment={comment} index={index} />
        ))}
    </ul>
    {status.comments.length > 1 && (
      <button onClick={() => setShowAllComments(!showAllComments)}>
        {showAllComments ? 'Show Less' : 'Show More'}
      </button>
    )}
    <div className="comment-section">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment..."
      />
      <button onClick={handleAddComment}>Post</button>
    </div>
  </div>
);

const StatusItem: React.FC<StatusItemProps> = ({
  status,
  refetchStatuses,
  followers,
}) => {
  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const { loggedInUserId, login, logout } = useAuth();

  const handleAddComment = async () => {
    try {
      if (!checkLogin()) {
        return;
      }
      if (!newComment || newComment === '') {
        return;
      }
      await postComment(loggedInUserId, status._id, newComment);
      setNewComment('');
      refetchStatuses();
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
      refetchStatuses();
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
        refetchStatuses={refetchStatuses}
      />
      <Content status={status} />
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

export default StatusItem;
