import { useState, useEffect } from 'react';
import { User } from '@/types/User';
import { fetchUsers } from '@/services/api';
import { getUsers, saveUsers, initializeStorage } from '@/utils/storage';

export function useUsers () {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const apiUsers = await fetchUsers();
        const initialUsers = initializeStorage(apiUsers);
        setUsers(initialUsers);
        setFilteredUsers(initialUsers);
      } catch (error) {
        console.error('Erro ao carregar usuários:', error);
        const storedUsers = getUsers();
        setUsers(storedUsers);
        setFilteredUsers(storedUsers);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = users.filter(
        user =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.username.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    } else {
      setFilteredUsers(users);
    }
  }, [searchTerm, users]);

  function addUser(user: Omit<User, 'id'>): void {
    const newUser = {
      ...user,
      id: users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1
    } as User;
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  function updateUser(updatedUser: User): void {
    const updatedUsers = users.map(user => 
      user.id === updatedUser.id ? updatedUser : user
    );
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const deleteUser = (id: number): void => {
    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    saveUsers(updatedUsers);
  };

  const getUserById = (id: number): User | undefined => {
    return users.find(user => user.id === id);
  };

  return {
    users: filteredUsers,
    loading,
    addUser,
    updateUser,
    deleteUser,
    getUserById,
    searchTerm,
    setSearchTerm
  };
};