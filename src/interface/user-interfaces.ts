export interface UserProfile {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: null | string;
  email: string;
  bio: string;
  followerCount: number;
}

export interface Comment {
  userId: {
    profilePicture: string;
  };
  content: string;
  createdAt: string;
}
