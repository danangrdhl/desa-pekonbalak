import apiClient from './apiClient';

export const getProducts = async (params = {}) => {
  const res = await apiClient.get('/products', { params });
  return res.data;
};

export const createProduct = async (payload) => {
  // If payload is FormData (file upload), set proper headers
  if (payload instanceof FormData) {
    const res = await apiClient.post('/products', payload, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  }
  const res = await apiClient.post('/products', payload);
  return res.data;
};

export default { getProducts, createProduct };
