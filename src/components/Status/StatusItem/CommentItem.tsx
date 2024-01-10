import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentItem: React.FC<any> = ({ comment, index }) => (
  <li key={index}>
    <div>
      <img
        className="profile-picture-comment"
        src={comment.userId?.profilePicture}
        alt="User"
        loading="lazy"
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
export default CommentItem;
