import Link from 'next/link';
import * as Avatar from '@radix-ui/react-avatar';
import { User } from '@/types/User';
import DeleteUserButton from '../Actions/DeleteUserButton';
import UpdateUserButton from '../Actions/UpdateUserButton';
import { FiArrowRight } from 'react-icons/fi';

interface UserCardProps {
  user: User;
  onDelete: (id: number) => void;
  onUpdateUser: (user: User) => void;
}

const UserCard: React.FC<UserCardProps> = ({ user, onDelete, onUpdateUser }) => {
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
          <div className='flex gap-2'>
            <UpdateUserButton user={user} onUpdateUser={onUpdateUser} />
            <DeleteUserButton onDelete={() => onDelete(user.id)} />
          </div>
        </div>

        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-1 truncate">{user.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300  mb-1">@{user.username}</p>
        <p className="text-sm text-gray-600 dark:text-gray-300  mb-3">{user.email}</p>

        <Link href={`/users/${user.id}`} className="inline-flex items-center
         text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 ">
            Ver detalhes
          <FiArrowRight className="ml-1 w-4 h-4" />
        </Link>
      </div>
    </div>
  );
};

export default UserCard;