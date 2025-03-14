import { useState, useEffect } from 'react';
import { RxAvatar } from "react-icons/rx";
import { useForm } from 'react-hook-form';
import * as Dialog from '@radix-ui/react-dialog';
import { User } from '@/types/User';
import Toast from '../../common/Feedback/Toast';
import InputForm from '../../common/Form/InputForm';
import AddUserButton from './AddUserButton';
import { fetchAddressByCep } from '@/services/api';

interface AddUserFormProps {
  onAddUser?: (user: Omit<User, 'id'>) => void;
  onEditUser?: (user: User) => void;
  user?: User;
  onCancel?: () => void;
  isEditing?: boolean;
  isOpen?: boolean;
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
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [toastMessage, setToastMessage] = useState(''); 
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue, control } = useForm<FormData>();

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

  async function handleCepChange(e: React.ChangeEvent<HTMLInputElement>) {
    const cep = e.target.value.replace(/\D/g, "");
    
    if (cep.length === 8) {
      try {
        const address = await fetchAddressByCep(cep);
      
        if (address && address.logradouro) {
          setValue("street", address.logradouro);
          setValue("city", address.localidade);
        } else {
          setToastMessage('CEP não encontrado.');
          setShowErrorToast(true);
        }
      } catch (error) {
        console.log("Erro ao buscar endereço:", error);
        setToastMessage('Erro ao buscar o CEP. Tente novamente.');
        setShowErrorToast(true); 
      }
    }
  }

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

   const renderFormContent = () => (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-black">
      <div className="mb-6 flex flex-col items-center dark:bg-gray-800">
        <div className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-3">
          {avatarPreview ? (
            <img src={avatarPreview} alt="Preview" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 dark:text-gray-400">
              <RxAvatar className="w-full h-full"/>
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
        control={control}
        mask="phone"
      />
      <InputForm
        id="zipcode"
        label="Cep"
        register={register}
        control={control}
        mask="cep"
        onChange={handleCepChange}
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

  return (
    <>
      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger asChild>
            <AddUserButton />
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
        open={showSuccessToast}
        setOpen={setShowSuccessToast}
        title="Sucesso!" 
        description={user ? "Usuário atualizado com sucesso." : "Usuário adicionado com sucesso."}
        type="success"
        duration={3000}
      />

      <Toast
        open={showErrorToast}
        setOpen={setShowErrorToast}
        title="Cep incorreto!"
        description={toastMessage}
        type="error"
        duration={3000}
      />
    </>
  );
};

export default AddUserForm;