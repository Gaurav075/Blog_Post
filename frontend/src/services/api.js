import axios from 'axios';

// Ensure API_URL always ends with /api
const getApiUrl = () => {
  const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';
  // If the URL doesn't end with /api, add it
  if (!baseUrl.endsWith('/api')) {
    return baseUrl + '/api';
  }
  return baseUrl;
};

const API_URL = getApiUrl();

// Add error handling interceptor
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'NETWORK_ERROR') {
      console.error('Network error - check if backend is running');
    }
    return Promise.reject(error);
  }
);

// Simple function to get headers with token
const getHeaders = () => {
  const token = localStorage.getItem('token');
  return token ? { Authorization: `Bearer ${token}` } : {};
};

// User API functions
export const registerUser = async (userData) => {
  try {
    const response = await axios.post(`${API_URL}/users/register`, userData);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Registration failed' };
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await axios.post(`${API_URL}/users/login`, credentials);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Login failed' };
  }
};

// Posts API functions
export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Failed to fetch posts' };
  }
};

export const getPostBySlug = async (slug, incrementView = true) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${slug}?incrementView=${incrementView}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Post not found' };
  }
};

export const getPostById = async (id) => {
  try {
    const response = await axios.get(`${API_URL}/posts/id/${id}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Post not found' };
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, postData, { headers: getHeaders() });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to create post' };
  }
};

export const updatePost = async (id, postData) => {
  try {
    const response = await axios.put(`${API_URL}/posts/${id}`, postData, { headers: getHeaders() });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to update post' };
  }
};

export const deletePost = async (id) => {
  try {
    await axios.delete(`${API_URL}/posts/${id}`, { headers: getHeaders() });
    return { success: true };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to delete post' };
  }
};

// Comments API functions
export const getCommentsByPost = async (postId) => {
  try {
    const response = await axios.get(`${API_URL}/comments/${postId}`);
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: 'Failed to fetch comments' };
  }
};

export const createComment = async (commentData) => {
  try {
    const response = await axios.post(`${API_URL}/comments`, commentData, { headers: getHeaders() });
    return { success: true, data: response.data };
  } catch (error) {
    return { success: false, message: error.response?.data?.message || 'Failed to create comment' };
  }
};

export const deleteComment = async (id) => {
  try {
    await axios.delete(`${API_URL}/comments/${id}`, { headers: getHeaders() });
    return { success: true };
  } catch (error) {
    return { success: false, message: 'Failed to delete comment' };
  }
};
