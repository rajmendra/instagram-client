import { apiCall } from '../utils';
import { API_URL } from '../constants';
import { Status } from './userInterfaces';

// Fetch statuses
const fetchStatus = async (userId: any): Promise<any> => {
  const url = `${API_URL}/status`;

  try {
    return apiCall(url, 'GET');
  } catch (error) {
    console.error('Error fetching statuses:', error);
    throw error;
  }
};

// Post comment to a status
const postComment = async (
  userId: string,
  statusId: string,
  commentText: string,
): Promise<void> => {
  const url = `${API_URL}/status/${userId}/comment/${statusId}`;

  try {
    return apiCall(url, 'POST', { content: commentText });
  } catch (error) {
    console.error('Error posting comment:', error);
    throw error;
  }
};

// Like a status
const likeStatus = async (userId: string, statusId: string): Promise<void> => {
  const url = `${API_URL}/status/${userId}/like/${statusId}`;

  try {
    return apiCall(url, 'POST');
  } catch (error:any) {
    console.log('error.response', error.response.data.message)
    //console.error('Error liking status:', error);
    throw error;
  }
};

// Post a status
const postStatus = async (
  loggedInUserId: string,
  data: FormData,
): Promise<void> => {
  const url = `${API_URL}/status/${loggedInUserId}`;

  try {
    console.log('data', data);
    return apiCall(url, 'POST', data, { headers: { "Content-Type": "multipart/form-data" } });
  } catch (error) {
    console.error('Error posting status:', error);
    throw error;
  }
};

// Follow a user
const followUser = async (
  followerId: string,
  followingId: string,
): Promise<void> => {
  const url = `${API_URL}/follow`;

  try {
    return apiCall(url, 'POST', {
      followerId,
      followingId,
    });
  } catch (error) {
    console.error('Error following user:', error);
    throw error;
  }
};

export { fetchStatus, likeStatus, postComment, postStatus, followUser };
