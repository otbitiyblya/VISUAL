import axios from 'axios';

const API_BASE_URL = 'https://jsonplaceholder.typicode.com';

export const fetchPosts = async () => {
  const response = await axios.get(`${API_BASE_URL}/posts`);
  return response.data;
};

export const fetchAlbums = async () => {
  const response = await axios.get(`${API_BASE_URL}/albums`);
  return response.data;
};

export const fetchTodos = async () => {
  const response = await axios.get(`${API_BASE_URL}/todos`);
  return response.data;
};

export const fetchUsers = async () => {
  const response = await axios.get(`${API_BASE_URL}/users`);
  return response.data;
};

export const addPost = async (post) => {
  const response = await axios.post(`${API_BASE_URL}/posts`, post);
  return response.data;
};

export const addAlbum = async (album) => {
  const response = await axios.post(`${API_BASE_URL}/albums`, album);
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await axios.post(`${API_BASE_URL}/todos`, todo);
  return response.data;
};

export const addUser = async (user) => {
  const response = await axios.post(`${API_BASE_URL}/users`, user);
  return response.data;
};

export const updatePost = async (id, post) => {
  const response = await axios.put(`${API_BASE_URL}/posts/${id}`, post);
  return response.data;
};

export const updateAlbum = async (id, album) => {
  const response = await axios.put(`${API_BASE_URL}/albums/${id}`, album);
  return response.data;
};

export const updateTodo = async (id, todo) => {
  const response = await axios.put(`${API_BASE_URL}/todos/${id}`, todo);
  return response.data;
};

export const updateUser = async (id, user) => {
  const response = await axios.put(`${API_BASE_URL}/users/${id}`, user);
  return response.data;
};

export const deletePost = async (id) => {
  await axios.delete(`${API_BASE_URL}/posts/${id}`);
};

export const deleteAlbum = async (id) => {
  await axios.delete(`${API_BASE_URL}/albums/${id}`);
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_BASE_URL}/todos/${id}`);
};

export const deleteUser = async (id) => {
  await axios.delete(`${API_BASE_URL}/users/${id}`);
};