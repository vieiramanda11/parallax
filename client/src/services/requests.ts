import api from './api';

export const getUsers = async () => {
  try {
    const response = await api.get('/users');
    if (response.status !== 200) {
      throw new Error(`Error: Received status code ${response.status}`);
    }
    return response.data;
  } catch (error) {
    console.error('Failed to fetch users:', error);
    return null;
  }
};
