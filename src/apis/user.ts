import { EditUser } from './interfaceDefs'
import { API_URL } from '../constant';

const getUserProfile = async (userId: any): Promise<EditUser> => {
  try {
    const response = await fetch(`${API_URL}/user/profile/${userId}`)

    if (!response.ok) {
      // Handle non-successful HTTP responses
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json() // Extract JSON data
    return data.user
  } catch (error) {
    // Handle any other errors that might occur
    console.error('Error fetching statuses:', error)
    throw error // Rethrow the error for the caller to handle if needed
  }
}

// Like a status
const updateUser = async (
  loggedInUserId: String,
  data: FormData,
): Promise<void> => {
  try {
    const response = await fetch(`${API_URL}/user/profile/${loggedInUserId}`, {
      method: 'PUT',
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

const getFollowingList = async (loggedInUserId: String): Promise<any[]> => {
  try {
    const response = await fetch(
      `${API_URL}/follow/${loggedInUserId}/following`,
    )

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`)
    }

    const data = await response.json() // Extract JSON data
    return data.followingList
  } catch (error) {
    console.error('Error liking status:', error)
    throw error
  }
}

export { updateUser, getUserProfile, getFollowingList }
