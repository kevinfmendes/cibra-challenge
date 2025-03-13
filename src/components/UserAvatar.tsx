import React from 'react';
import * as Avatar from '@radix-ui/react-avatar';

interface UserAvatarProps {
  name: string;
  avatar?: string;
}

const UserAvatar: React.FC<UserAvatarProps> = ({ name, avatar }) => {
  return (
    <Avatar.Root className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
      <Avatar.Image
        src={avatar || `https://ui-avatars.com/api/?name=${name}&background=random&size=128`}
        alt={name}
        className="w-full h-full object-cover"
      />
      <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-2xl">
        {name.substring(0, 2).toUpperCase()}
      </Avatar.Fallback>
    </Avatar.Root>
  );
};

export default UserAvatar;