export interface UserProfile {
  _id: string;
  username: string;
  fullName: string;
  profilePicture: null | File;
  email: string;
  bio: string;
}

export interface Comment {
  userId: {
    profilePicture: string;
  };
  content: string;
  createdAt: string;
}
