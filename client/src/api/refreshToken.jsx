import axios from 'axios';

const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem('refreshToken');

  try {
    const response = await axios.post('http://localhost:3001/auth/token', { token: refreshToken });
    const newAccessToken = response.data.accessToken;
    localStorage.setItem('accessToken', newAccessToken);
    return newAccessToken;
  } catch (error) {
    console.error('Error refreshing token:', error);
    return null;
  }
};

export default refreshAccessToken;
