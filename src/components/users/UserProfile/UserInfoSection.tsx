interface UserInfoSectionProps {
  title: string;
  children: React.ReactNode;
}

const UserInfoSection: React.FC<UserInfoSectionProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-gray-700">{title}</h2>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );
}; 

export default UserInfoSection;