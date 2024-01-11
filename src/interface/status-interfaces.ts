import { UserProfile } from './user-interfaces';
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
