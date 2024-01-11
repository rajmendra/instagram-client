import React, { Suspense, lazy } from 'react';
import { formatDistanceToNow } from 'date-fns';
const LazyImage = lazy(() => import('../../Common/LazyImage'));

const CommentItem: React.FC<any> = ({ comment, index }) => (
  <li key={index}>
    <div className="comment-row">
      <div className="comment-col">
        <span
          className="profile-picture"
          style={{ width: '30px', height: '30px' }}
        >
          <Suspense>
            <LazyImage
              src={comment.userId?.profilePicture}
              width={30}
              alt="User"
              className={'profile-picture-comment'}
            />
          </Suspense>
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
