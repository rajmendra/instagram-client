import { Status } from './interfaceDefs'

const API_URL = 'http://localhost:3001'
const fetchStatus = async (userId: any): Promise<Status[]> => {
  try {
    const response = await fetch(`${API_URL}/status`)

    if (!response.ok) {
      // Handle non-successful HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json() // Extract JSON data
    return data.statuses
  } catch (error) {
    // Handle any other errors that might occur
    console.error('Error fetching statuses:', error)
    throw error // Rethrow the error for the caller to handle if needed
  }
}

// Post comment to a status
const postComment = async (
  userId: string,
  statusId: string,
  commentText: string,
): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/status/${userId}/comment/${statusId}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: commentText }),
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error posting comment:', error)
    throw error
  }
}

// Like a status
const likeStatus = async (userId: string, statusId: string): Promise<void> => {
  try {
    const response = await fetch(
      `${API_URL}/status/${userId}/like/${statusId}`,
      {
        method: 'POST',
      },
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error liking status:', error)
    throw error
  }
}

// Like a status
const postStatus = async (
  loggedInUserId: String,
  data: FormData,
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/status/${loggedInUserId}`, {
      method: 'POST',
      body: data,
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error liking status:', error)
    throw error
  }
}

// Like a status
const followUser = async (
  followerId: String,
  followingId: String,
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        followerId,
        followingId,
      }),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }
  } catch (error) {
    console.error('Error liking status:', error)
    throw error
  }
}

export { fetchStatus, likeStatus, postComment, postStatus, followUser }
