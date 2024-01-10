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

export interface Status {
  _id: string;
  content: string;
  type: string;
  imageUrl?: string;
  videoUrl?: string;
  likes: string[];
  comments: Comment[];
  postedBy: UserProfile;
}
