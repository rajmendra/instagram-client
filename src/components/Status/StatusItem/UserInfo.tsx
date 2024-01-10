import Follow from '../Follow';

const UserInfo: React.FC<any> = ({
  status,
  loggedInUserId,
  followers,
  refetchFollowers,
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
          refetchFollowers={refetchFollowers}
        />
      )}
    </div>
  </div>
);

export default UserInfo;
