interface UserDetailsLayoutProps {
  children: React.ReactNode;
}

const UserDetailsLayout: React.FC<UserDetailsLayoutProps> = ({ children }) => {
  return (
    <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
      {children}
    </div>
  );
};

export default UserDetailsLayout;