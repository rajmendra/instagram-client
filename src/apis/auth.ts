import { apiCall } from '../utils';

const API_URL = process.env.REACT_APP_API_URL;

const registerUser = async (userData: any): Promise<any> => {
  const url = `${API_URL}/auth/register`;
  const method = 'POST';

  return apiCall(url, method, userData);
};

const loginUser = async (credentials: any): Promise<any> => {
  const url = `${API_URL}/auth/login`;
  const method = 'POST';

  return apiCall(url, method, credentials);
};

export { registerUser, loginUser };
