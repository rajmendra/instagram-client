import { apiCall } from '../utils';
import { API_URL } from '../constants';

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
