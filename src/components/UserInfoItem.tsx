import React from 'react';

interface UserInfoItemProps {
  label: string;
  value: string | React.ReactNode;
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ label, value }) => {
  return (
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-gray-900 dark:text-gray-100">{value}</p>
    </div>
  );
};

export default UserInfoItem;