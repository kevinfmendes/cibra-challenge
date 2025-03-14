interface UserDetailsCardProps {
  children: React.ReactNode;
}

const UserDetailsCard: React.FC<UserDetailsCardProps> = ({ children }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6 sm:p-8">
        {children}
      </div>
    </div>
  );
};

export default UserDetailsCard;