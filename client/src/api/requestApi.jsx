import axios from 'axios';
import refreshAccessToken from './path/to/refreshAccessToken';

const apiRequest = async (url, options = {}) => {
  let accessToken = localStorage.getItem('accessToken');

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  try {
    const response = await axios({
      url,
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return response;
  } catch (error) {
    if (error.response && error.response.status === 403) {
      accessToken = await refreshAccessToken();
      if (accessToken) {
        const response = await axios({
          url,
          ...options,
          headers: {
            ...options.headers,
            Authorization: `Bearer ${accessToken}`,
          },
        });
        return response;
      }
    }
    throw error;
  }
};

export default apiRequest;
