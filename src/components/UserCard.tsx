import React from 'react';
import Link from 'next/link';
import * as Avatar from '@radix-ui/react-avatar';
import { User } from '@/types/User';
import DeleteUserButton from './DeleteUserButton';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform hover:scale-[1.02]">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Avatar.Root className="flex items-center justify-center w-16 h-16
           rounded-full overflow-hidden bg-gray-200 dark:bg-gray-600">
            <Avatar.Image
              src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random`}
              alt={user.name}
              className="w-full h-full object-cover"
            />
            <Avatar.Fallback className="w-full h-full flex items-center 
            justify-center bg-gray-200 text-gray-600 dark:text-gray-300">
              {user.name.substring(0, 2).toUpperCase()}
            </Avatar.Fallback>
          </Avatar.Root>
          
          <DeleteUserButton onDelete={() => onDelete(user.id)} />
        </div>
        
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 truncate">{user.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300  mb-1">@{user.username}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300  mb-3">{user.email}</p>
        
        <Link href={`/users/${user.id}`} className="inline-flex items-center
         text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">
          Ver detalhes
          <svg
            className="ml-1 w-4 h-4"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
};

export default UserCard;