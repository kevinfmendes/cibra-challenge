import { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { User } from '@/types/User';
import AddUserForm from './AddUserForm';
import { FiEdit } from 'react-icons/fi';

interface UpdateUserButtonProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

const UpdateUserButton: React.FC<UpdateUserButtonProps> = ({ user, onUpdateUser }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
  
    const handleUpdateUser = (updatedUser: User) => {
        onUpdateUser(updatedUser);
        setIsOpen(false);
    };
  
      return (
        <Dialog.Root open={isOpen} onOpenChange={setIsOpen}>
          <Dialog.Trigger asChild>
            <button
              className="p-2 text-gray-600 dark:text-blue-300 hover:text-blue-600 dark:hover:text-blue-400 rounded-full hover:bg-blue-50 dark:hover:bg-blue-400/10 transition-colors"
              aria-label="Editar usuário"
            >
              <FiEdit className="h-5 w-5" />
            </button>
          </Dialog.Trigger>
          
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70" />
            <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2
             -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-2xl
              w-full max-h-[95vh] overflow-y-auto">
              <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                Editar Usuário
              </Dialog.Title>
              
              <AddUserForm 
                user={user}
                onEditUser={handleUpdateUser}
                onCancel={() => setIsOpen(false)}
                isEditing={true}
              />
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      );
    };
    
  
  export default UpdateUserButton;