import React, { useState } from 'react';
import { toast } from 'react-toastify';

import CommentItem from './CommentItem';
import { postComment } from '../../../apis/status';
import Loader from '../../Common/Loader'

const CommentList: React.FC<any> = ({
  status,
  checkLogin,
  loggedInUserId,
  refetchStatuses
}) => {

  const [newComment, setNewComment] = useState('');
  const [showAllComments, setShowAllComments] = useState(false);
  const [isLoading, setLoading] = useState(false);

  
  const handleAddComment = async () => {
    try {
      if (!checkLogin() || !newComment.trim()) {
        return;
      }
      setLoading(true);
      await postComment(loggedInUserId, status._id, newComment);
      setNewComment('');
      refetchStatuses(false);
    } catch (error: any) {
      toast.error(error);
      console.error('Error adding comment:', error);
    }
    finally{
      setLoading(false);
    }
  };


return (
  <div className="comments">
    <ul>
      {status.comments
        .slice(0, showAllComments ? undefined : 1)
        .map((comment: any, index: any) => (
          <CommentItem key={index} comment={comment} index={index} />
        ))}
    </ul>
    {status.comments.length > 1 && (
      <span className="show-more">
        <button onClick={() => setShowAllComments(!showAllComments)}>
          {showAllComments ? 'Show Less' : 'Show More'}
        </button>
      </span>
    )}
    <div className="comment-section">
      <input
        type="text"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        placeholder="Add a comment...(max 500 words)"
        maxLength={500}
      />
      <button onClick={handleAddComment}>{isLoading ? <Loader/> : 'Post' }</button>
    </div>
  </div>
);
    }

export default CommentList;
