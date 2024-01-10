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
        'Content-Type': 'application/json',
        ...config.headers, // Override default headers with provided headers
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
