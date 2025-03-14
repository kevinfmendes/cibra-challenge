interface UserDetailsGridProps {
  children: React.ReactNode;
}

const UserDetailsGrid: React.FC<UserDetailsGridProps> = ({ children }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {children}
    </div>
  );
};

export default UserDetailsGrid;