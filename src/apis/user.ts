import { apiCall } from '../utils';
import { EditUser } from './userInterfaces';
import { API_URL } from '../constants';

// Get user profile
const getUserProfile = async (userId: any): Promise<EditUser> => {
  const url = `${API_URL}/user/profile/${userId}`;

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
  const url = `${API_URL}/user/profile/${loggedInUserId}`;

  try {
    await apiCall(url, 'PUT', data, { headers: { "Content-Type": "multipart/form-data" } });
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

export { updateUser, getUserProfile, getFollowingList };
