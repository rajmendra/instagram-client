import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const CommentItem: React.FC<any> = ({ comment, index }) => (
  <li key={index}>
    <div>
    <span className="profile-picture" style={{width: "30px", height: "30px"}}>
      <img
        className="profile-picture-comment"
        src={comment.userId?.profilePicture}
        alt="User"
        loading="lazy"
      />
      </span>
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
