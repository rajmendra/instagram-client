import CommentItem from './CommentItem';

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
          <CommentItem key={index} comment={comment} index={index} />
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

export default CommentList;
