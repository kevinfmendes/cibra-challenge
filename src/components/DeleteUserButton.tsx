import React, { useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

interface DeleteUserButtonProps {
  onDelete: () => void;
}

const DeleteUserButton: React.FC<DeleteUserButtonProps> = ({ onDelete }) => {
  const [open, setOpen] = useState(false);

  function handleDelete() {
    onDelete();
    setOpen(false);
  }

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <button
          className="p-2 text-red-600 hover:text-red-800 
          dark:text-red-400 dark:hover:text-red-300 rounded-full hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
          aria-label="Excluir usuário"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-md w-full">
          <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Confirmar exclusão
          </Dialog.Title>
          <Dialog.Description className="text-gray-600 dark:text-gray-300 mb-6">
            Tem certeza que deseja excluir este usuário? Esta ação não pode ser desfeita.
          </Dialog.Description>

          <div className="flex justify-end gap-3">
            <Dialog.Close asChild>
              <button className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors">
                Cancelar
              </button>
            </Dialog.Close>
            <button
              onClick={handleDelete}
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              Excluir
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default DeleteUserButton;