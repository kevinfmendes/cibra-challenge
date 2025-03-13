import { User } from '@/types/User';

const USERS_STORAGE_KEY = 'cibra_users';

export const saveUsers = (users: User[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));
  }
};

export const getUsers = (): User[] => {
  if (typeof window !== 'undefined') {
    const storedUsers = localStorage.getItem(USERS_STORAGE_KEY);
    return storedUsers ? JSON.parse(storedUsers) : [];
  }
  return [];
};

export const initializeStorage = (apiUsers: User[]): User[] => {
  const storedUsers = getUsers();
  if (storedUsers.length === 0) {
    saveUsers(apiUsers);
    return apiUsers;
  }
  return storedUsers;
};