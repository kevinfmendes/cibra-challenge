'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { User } from '@/types/User';
import { useUsers } from '@/hooks/useUsers';
import LoadingSpinner from '@/components/common/Feedback/LoadingSpinner';
import UserNotFound from '@/components/users/UserList/UserNotFound';
import BackButton from '@/components/common/Button/BackButton';
import {UserAvatar, UserHeader} from '@/components/users/UserProfile';
import {UserDetailsLayout, UserDetailsCard, UserDetailsGrid} from '@/components/users/UserDetails';
import {UserInfoSection, UserInfoItem} from '@/components/users/UserProfile';
import Toast from '@/components/common/Feedback/Toast';

export default function UserDetailsPage() {
  const [editedUser, setEditedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  const params = useParams();
  const userId = params?.id ? parseInt(params.id as string, 10) : null;

  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm<User>();

  const { getUserById, updateUser } = useUsers();
  const user = userId ? getUserById(userId) : null;

  useEffect(() => {
    if (user) {
      setEditedUser(JSON.parse(JSON.stringify(user)));
      reset(user);
    }
  }, [user, reset]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    if (user) {
      reset(user);
    }
    setIsEditing(false);
  };

  const handleSaveEdit = (data: User) => {
    if (!editedUser || !user) return;

    try {
      const updatedUser = { ...editedUser, ...data };
      updateUser(updatedUser);
      setIsEditing(false);
      setToastMessage('Usuário atualizado com sucesso!');
      setShowToast(true);
    } catch (error) {
      console.error('Erro ao atualizar usuário:', error);
      setToastMessage('Erro ao atualizar usuário.');
      setShowToast(true);
    }
  };

  if (!user) {
    return <UserNotFound />;
  }

  return (
    <UserDetailsLayout>
      <div className="mb-6">
        <BackButton />
      </div>

      <UserDetailsCard>
        <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
          <UserAvatar name={user.name} avatar={user.avatar} />
          <UserHeader
            name={isEditing ? editedUser?.name ?? user.name : user.name}
            username={isEditing ? editedUser?.username ?? user.username : user.username}
            email={isEditing ? editedUser?.email ?? user.email : user.email}
            isEditable={!isEditing}
            onEditClick={handleEditClick}
          />
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit(handleSaveEdit)} className="space-y-4 text-black">
            <UserDetailsGrid>
              <UserInfoSection title="Informações de Contato">
                <UserInfoItem
                  label="Nome"
                  value={editedUser?.name ?? ''}
                  isEditing={isEditing}
                  name="name"
                  required
                  register={register}
                  errors={errors.name}
                  maxlength={50}
                />
                <UserInfoItem
                  label="Nome de Usuário"
                  value={editedUser?.username ?? ''}
                  isEditing={isEditing}
                  name="username"
                  required
                  register={register}
                  errors={errors.username}
                  maxlength={30}
                />
                <UserInfoItem
                  label="Email"
                  value={editedUser?.email ?? ''}
                  isEditing={isEditing}
                  name="email"
                  required
                  register={register}
                  errors={errors.email}
                />
                <UserInfoItem
                  label="Telefone"
                  value={editedUser?.phone ?? ''}
                  isEditing={isEditing}
                  name="phone"
                  register={register}
                  errors={errors.phone}
                  mask="phone" 
                />
                <UserInfoItem
                  label="Website"
                  value={editedUser?.website ?? ''}
                  isEditing={isEditing}
                  name="website"
                  register={register}
                  errors={errors.website}
                  maxlength={60}
                />
              </UserInfoSection>
              <div className='flex gap-9 flex-col'>
              <UserInfoSection title="Empresa">
                <UserInfoItem
                  label="Nome da Empresa"
                  value={editedUser?.company?.name ?? ''}
                  isEditing={isEditing}
                  name="company.name"
                  register={register}
                  errors={errors.company?.name}
                  maxlength={30}
                />
                <UserInfoItem
                  label="Slogan"
                  value={editedUser?.company?.catchPhrase ?? ''}
                  isEditing={isEditing}
                  name="company.catchPhrase"
                  register={register}
                  errors={errors.company?.catchPhrase}
                  maxlength={60}
                />
              </UserInfoSection>

              <UserInfoSection title="Endereço">
                <UserInfoItem
                  label="Rua"
                  value={editedUser?.address?.street ?? ''}
                  isEditing={isEditing}
                  name="address.street"
                  register={register}
                  errors={errors.address?.street}
                  maxlength={50}
                />
                <div className="grid grid-cols-2 gap-3">
                  <UserInfoItem
                    label="Cidade"
                    value={editedUser?.address?.city ?? ''}
                    isEditing={isEditing}
                    name="address.city"
                    register={register}
                    errors={errors.address?.city}
                    maxlength={50}
                  />
                  <UserInfoItem
                    label="CEP"
                    value={editedUser?.address?.zipcode ?? ''}
                    isEditing={isEditing}
                    name="address.zipcode"
                    register={register}
                    errors={errors.address?.zipcode}
                    mask="cep"
                    onCepFetch={(address) => {
                      setValue('address.street', address.logradouro);
                      setValue('address.city', address.localidade);
                    }}
                  />
                </div>
              </UserInfoSection>
              </div>
            </UserDetailsGrid>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                type="button"
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
            </div>
          </form>
        ) : (
          <UserDetailsGrid>
            <UserInfoSection title="Informações de Contato">
              <UserInfoItem
                label="Nome"
                value={user.name}
                isEditing={false}
              />
              <UserInfoItem
                label="Nome de Usuário"
                value={user.username}
                isEditing={false}
              />
              <UserInfoItem
                label="Email"
                value={user.email}
                isEditing={false}
              />
              <UserInfoItem
                label="Telefone"
                value={user.phone || 'Não informado'}
                isEditing={false}
              />
              <UserInfoItem
                label="Website"
                value={
                  user.website ? (
                    <a
                      href={`https://${user.website}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
                    >
                      {user.website}
                    </a>
                  ) : (
                    'Não informado'
                  )
                }
                isEditing={false}
              />
            </UserInfoSection>
            <div className='flex gap-3 flex-col'>
            <UserInfoSection title="Empresa">
              <UserInfoItem
                label="Nome da Empresa"
                value={user.company?.name || 'Não informado'}
                isEditing={false}
              />
              <UserInfoItem
                label="Slogan"
                value={user.company?.catchPhrase || 'Não informado'}
                isEditing={false}
              />
            </UserInfoSection>
              <UserInfoSection title="Endereço">
                <UserInfoItem
                  label="Rua"
                  value={user.address?.street || 'Não informado'}
                  isEditing={false}
                />
                <UserInfoItem
                  label="Complemento"
                  value={user.address?.suite || 'Não informado'}
                  isEditing={false}
                />
                <div className="grid grid-cols-2 gap-3">
                  <UserInfoItem
                    label="Cidade"
                    value={user.address?.city || 'Não informado'}
                    isEditing={false}
                  />
                  <UserInfoItem
                    label="CEP"
                    value={user.address?.zipcode || 'Não informado'}
                    isEditing={false}
                  />
                </div>
              </UserInfoSection>
            </div>
          </UserDetailsGrid>
        )}
      </UserDetailsCard>

      <Toast
        open={showToast}
        setOpen={setShowToast}
        title="Notificação"
        description={toastMessage}
        type={toastMessage.includes('sucesso') ? 'success' : 'error'}
        duration={3000}
      />
    </UserDetailsLayout>
  );
}