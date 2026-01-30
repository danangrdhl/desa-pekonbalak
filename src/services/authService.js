import apiClient from './apiClient';

export const login = async (email, password) => {
  const res = await apiClient.post('/auth/login', { email, password });
  return res.data; // expect { token, user }
};

export const me = async () => {
  const res = await apiClient.get('/auth/me');
  return res.data;
};

export default { login, me };
