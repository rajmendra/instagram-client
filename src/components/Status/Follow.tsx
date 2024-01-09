import React from 'react'
import { toast } from 'react-toastify'
import { postComment, likeStatus, followUser } from '../../apis/status'

interface FollowingList {
  _id: string
  followingId: string
}

interface FollowProps {
  userId: string
  followingId: string
  followingList: FollowingList[]
  refetchStatuses: any
}

const Follow: React.FC<FollowProps> = ({
  userId,
  followingId,
  followingList,
  refetchStatuses,
}) => {
  const isAlreadyFollowing = followingList.some(
    (item) => item.followingId === followingId,
  )

  return (
    <div>
      {isAlreadyFollowing ? (
        <button
          onClick={() => handleFollow(userId, followingId, refetchStatuses)}
        >
          Unfollow
        </button>
      ) : (
        <button
          onClick={() => handleFollow(userId, followingId, refetchStatuses)}
        >
          Follow
        </button>
      )}
    </div>
  )
}

const handleFollow = async (
  loggedInUserId: string,
  followingId: string,
  refetchStatuses: any,
) => {
  try {
    if (!loggedInUserId || loggedInUserId === '') {
      console.log(loggedInUserId)
      toast.error('Please login fist')
      return false
    }
    await followUser(loggedInUserId, followingId)
    refetchStatuses()
  } catch (error) {
    console.error('Error toggling follow:', error)
  }
}

export default Follow
