
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { likeStatus } from '../../../apis/status';
import Loader from '../../Common/Loader'

const ActionButton: React.FC<any> = ({ handleLikeStatus, status, isLoading, hasLikedAlready }) => (
  <div className="status-actions">
    <button onClick={handleLikeStatus}> {isLoading ? <Loader/>:  hasLikedAlready ? 'Liked' : 'Like'}</button>
    <div>Likes: {status.totalLikes}</div>
    <div>Comments: {status.totalComments}</div>
  </div>
);

const Like: React.FC<any> = ({
  checkLogin,
  status,
  refetchStatuses,
  refetchFollowers,
  loggedInUserId,
  likes
}) => {
  
  const [isLoading, setLoading] = useState(false);
  const hasLikedAlready = likes.some(
    (item: any) => item?.statusId?._id === status._id,
  );


  const handleLikeStatus = async () => {
    try {
      if (!checkLogin()) {
        return;
      }
      setLoading(true);
      await likeStatus(loggedInUserId, status._id);
      refetchStatuses(false);
      refetchFollowers();
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
      console.error('Error liking status:', error.message);
    }
    finally{
      setLoading(false);
    }
  };
  return (<ActionButton hasLikedAlready={hasLikedAlready} isLoading={isLoading} handleLikeStatus={handleLikeStatus} status={status} />);
}


export default Like;
