// components/AddUserForm.tsx
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { User } from '@/types/User';
import Toast from './Toast';
import InputForm from './InputForm';

interface AddUserFormProps {
  onAddUser?: (user: Omit<User, 'id'>) => void;
  onEditUser?: (user: User) => void;
  user?: User;
  onCancel?: () => void;
  isEditing?: boolean; // Propriedade para indicar se está editando
  isOpen?: boolean; // Propriedade para controlar o estado do Dialog
  onOpenChange?: (open: boolean) => void; 
}

type FormData = {
  name: string;
  username: string;
  email: string;
  phone: string;
  website: string;
  street: string;
  city: string;
  zipcode: string;
};

const AddUserForm: React.FC<AddUserFormProps> = ({ onAddUser, onEditUser, onCancel, 
                                                    user, isEditing = false, isOpen, onOpenChange}) => {
  
  const [internalOpen, setInternalOpen] = useState(false);
  const open = isOpen !== undefined ? isOpen : internalOpen;
  const setOpen = onOpenChange || setInternalOpen;                                                    
  const [showToast, setShowToast] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<FormData>();

  useEffect(() => {
    if (user) {
      setValue('name', user.name);
      setValue('username', user.username);
      setValue('email', user.email);
      setValue('phone', user.phone);
      setValue('website', user.website);
      setValue('street', user.address.street);
      setValue('city', user.address.city);
      setValue('zipcode', user.address.zipcode);
      setAvatarPreview(user.avatar || null);
    }
  }, [user, setValue]);

  function handleFileChange (e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onSubmit = (data: FormData) => {
    const newUser: Omit<User, 'id'> = {
      name: data.name,
      username: data.username,
      email: data.email,
      phone: data.phone,
      website: data.website,
      company: {
        name: '',
        catchPhrase: '',
        bs: '',
      },
      address: {
        street: data.street,
        city: data.city,
        suite: '',
        zipcode: data.zipcode,
      },
      avatar: avatarPreview || undefined
    };

    if (user && onEditUser) {
      const updatedUser = { ...newUser, id: user.id } as User;
      onEditUser(updatedUser);
    } else if (onAddUser) {
      onAddUser(newUser);
    }
  
    setOpen(false);
    setShowToast(true);
    reset();
    setAvatarPreview(null);
  };

   // Renderiza apenas o conteúdo do formulário quando estiver no modo de edição
   const renderFormContent = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="mb-6 flex flex-col items-center dark:bg-gray-800">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-3">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}
        </div>
        <label className="block">
          <span className="sr-only">Escolher foto</span>
          <input
            type="file"
            accept="image/*"
            className="block w-full text-sm text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0
              file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 dark:file:text-blue-400 hover:file:bg-blue-100 dark:hover:file:bg-blue-900/30"
            onChange={handleFileChange}
          />
        </label>
      </div>

      <InputForm
        id="name"
        label="Nome completo"
        register={register}
        errors={errors.name}
        required
      />
      <InputForm
        id="username"
        label="Nome de usuário"
        register={register}
        errors={errors.username}
        required
      />
      <InputForm
        id="email"
        label="Email"
        type="email"
        register={register}
        errors={errors.email}
        required
      />
      <InputForm
        id="phone"
        label="Telefone"
        register={register}
      />
      <InputForm
        id="zipcode"
        label="Cep"
        register={register}
      />
      <InputForm
        id="street"
        label="Rua"
        register={register}
      />
      <InputForm
        id="city"
        label="Cidade"
        register={register}
      />

      <div className="flex justify-end gap-3 pt-4">
        <button
          type="button"
          onClick={() => {
            setOpen(false);
            if (onCancel) onCancel();
          }}
          className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
        >
          Cancelar
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          {user ? 'Salvar' : 'Adicionar'}
        </button>
      </div>
    </form>
  );

  // Se estiver no modo de edição, renderiza apenas o conteúdo do formulário
  if (isEditing) {
    return (
      <>
        {renderFormContent()}
        
        <Toast 
          open={showToast} 
          setOpen={setShowToast} 
          title="Sucesso!" 
          description="Usuário atualizado com sucesso."
          type="success"
          duration={3000}
        />
      </>
    );
  }

  // Caso contrário, renderiza o Dialog com o botão de adicionar
  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
          <button className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white w-14 h-14 rounded-full flex items-center justify-center shadow-lg">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 4v16m8-8H4"
              />
            </svg>
          </button>
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 dark:bg-black/70" />
          <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2
           -translate-y-1/2 bg-white dark:bg-gray-800 rounded-lg p-6 shadow-xl max-w-2xl w-full
            max-h-[95vh] overflow-y-auto">
            <Dialog.Title className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              {user ? 'Editar Usuário' : 'Adicionar Novo Usuário'}
            </Dialog.Title>

            {renderFormContent()}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>

      <Toast 
        open={showToast} 
        setOpen={setShowToast} 
        title="Sucesso!" 
        description={user ? "Usuário atualizado com sucesso." : "Usuário adicionado com sucesso."}
        type="success"
        duration={3000}
      />
    </>
  );
};

export default AddUserForm;