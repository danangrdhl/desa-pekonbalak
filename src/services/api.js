const API_BASE_URL = 'http://localhost:3000/api';

// Products API
export const productsAPI = {
  getAll: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const url = `${API_BASE_URL}/products${queryString ? `?${queryString}` : ''}`;
    const response = await fetch(url, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  },

  getBySlug: async (slug) => {
    const response = await fetch(`${API_BASE_URL}/products/${slug}`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Failed to fetch product');
    return response.json();
  },

  getByCategory: async (category) => {
    const response = await fetch(`${API_BASE_URL}/products/category/${category}`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Failed to fetch products');
    return response.json();
  }
};

// Galeri API
export const galeriAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/galeri`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Failed to fetch galeri');
    return response.json();
  },

  getById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/galeri/${id}`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Failed to fetch galeri');
    return response.json();
  }
};

// Infografis API
export const infografisAPI = {
  getAll: async () => {
    const response = await fetch(`${API_BASE_URL}/infografis`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Failed to fetch infografis');
    return response.json();
  },

  getByType: async (type) => {
    const response = await fetch(`${API_BASE_URL}/infografis/type/${type}`, {
      headers: { 'Cache-Control': 'no-cache' }
    });
    if (!response.ok) throw new Error('Failed to fetch infografis');
    return response.json();
  }
};
