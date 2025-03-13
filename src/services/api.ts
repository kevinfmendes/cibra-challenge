import axios from 'axios';
import { User } from '@/types/User';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};