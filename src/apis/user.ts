import { apiCall } from '../utils';

const API_URL = process.env.REACT_APP_API_URL;

// Get user profile
const getUserProfile = async (userId: any): Promise<any> => {
  const url = `${API_URL}/user/${userId}`;

  try {
    const data = await apiCall(url, 'GET');
    return data.user;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

// Update user profile
const updateUser = async (
  loggedInUserId: string,
  data: FormData,
): Promise<void> => {
  const url = `${API_URL}/user/${loggedInUserId}`;

  try {
    await apiCall(url, 'PUT', data, {
      headers: { content_type: 'multipart/form-data' },
    });
  } catch (error) {
    console.error('Error updating user profile:', error);
    throw error;
  }
};

// Get following list
const getFollowingList = async (loggedInUserId: string): Promise<any> => {
  const url = `${API_URL}/follow/${loggedInUserId}/following`;

  try {
    const data = await apiCall(url, 'GET');
    return data.followingList;
  } catch (error) {
    console.error('Error fetching following list:', error);
    throw error;
  }
};

const getUserLikes = async (loggedInUserId: string): Promise<any> => {
  const url = `${API_URL}/user/${loggedInUserId}/likes`;

  try {
    const data = await apiCall(url, 'GET');
    return data.likes;
  } catch (error) {
    console.error('Error fetching following list:', error);
    throw error;
  }
};


export { updateUser, getUserProfile, getFollowingList, getUserLikes };
