import React from 'react';
import { formatDistanceToNow } from 'date-fns';
import { IKImage } from 'imagekitio-react';
const urlEndpoint = 'https://ik.imagekit.io/j5laypcak';

const CommentItem: React.FC<any> = ({ comment, index }) => (
  <li key={index}>
    <div className="comment-row">
      <div className="comment-col">
        <span
          className="profile-picture"
          style={{ width: '30px', height: '30px' }}
        >
          <IKImage
            urlEndpoint={urlEndpoint}
            alt="User"
            loading="lazy"
            src={comment.userId?.profilePicture}
            className="profile-picture-comment"
            width="30"
          />
        </span>
      </div>
      <div className="comment-col comment">
        {comment.content}
        {comment.createdAt && (
          <div className="comment-date">
            {formatDistanceToNow(new Date(comment.createdAt), {
              addSuffix: true,
            })}
          </div>
        )}
      </div>
    </div>
  </li>
);
export default CommentItem;
