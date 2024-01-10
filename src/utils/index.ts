import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
const apiCall = async (
  url: string,
  method: string,
  data?: any,
  config: AxiosRequestConfig = {},
): Promise<any> => {
  try {
    const response: AxiosResponse = await axios({
      url,
      method,
      data,
      headers: {
        'auth-token': localStorage.getItem('token'),
        'Content-Type': config?.headers?.content_type || 'application/json',
      },
      ...config,
    });

    return response.data;
  } catch (error) {
    console.error(`Error during ${method} request to ${url}:`, error);
    throw error;
  }
};

export { apiCall };
