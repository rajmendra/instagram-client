export interface User {
  _id: string
  username: string
  fullName: string
  profilePicture: null | File
  email: string
  bio: string
}

export interface EditUser {
  _id: string
  username: string
  fullName: string
  profilePicture: string
  email: string
  bio: string
}

export interface Status {
  _id: string
  content: string
  type: string
  imageUrl?: string
  videoUrl?: string
  likes: Array<string>
  comments: Array<{
    userId: { profilePicture: string }
    content: string
    createdAt: string
  }>
  postedBy: {
    _id: string
    username: string
    fullName: string
    bio: string
    profilePicture: string
    isFollowing: boolean
  }
}
