import React from 'react';

interface UserHeaderProps {
  name: string;
  username: string;
  email: string;
}

const UserHeader: React.FC<UserHeaderProps> = ({ name, username, email }) => {
  return (
    <div className="text-center sm:text-left">
      <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{name}</h1>
      <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">@{username}</p>
      <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center sm:justify-start">
        <svg
          className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400"
          fill="currentColor"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
          <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
        </svg>
        {email}
      </p>
    </div>
  );
};

export default UserHeader;