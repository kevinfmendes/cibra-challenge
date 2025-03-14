import { IoPersonAddSharp } from "react-icons/io5";

interface AddUserButtonProps {
  onClick?: () => void;
  size?: number;
  iconSize?: number;
}

const AddUserButton: React.FC<AddUserButtonProps> = ({ onClick, size = 80, iconSize = 40 }) => {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white 
      rounded-full flex items-center justify-center shadow-lg transition-all"
      style={{ width: size, height: size }}
    >
      <IoPersonAddSharp className="text-white" style={{ width: iconSize, height: iconSize }} />
    </button>
  );
};

export default AddUserButton;