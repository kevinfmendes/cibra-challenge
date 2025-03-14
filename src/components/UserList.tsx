import React from 'react';
import { User } from '@/types/User';
import UserCard from './UserCard';

interface UserListProps {
  users: User[];
  onDelete: (id: number) => void;
  onUpdateUser: (user: User) => void;
  loading: boolean;
}

const UserList: React.FC<UserListProps> = ({ users, onDelete, onUpdateUser, loading }) => {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className="text-center py-12">
        <svg
          className="mx-auto h-16 w-16 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
        <h3 className="mt-2 text-lg font-medium text-gray-900">Nenhum usuário encontrado</h3>
        <p className="mt-1 text-gray-500">Tente uma nova busca ou adicione um usuário.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {users.map((user) => (
        <UserCard 
          key={user.id}
          user={user}
          onDelete={onDelete}
          onUpdateUser={onUpdateUser} />
      ))}
    </div>
  );
};

export default UserList;