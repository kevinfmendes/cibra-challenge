'use client';
import { useUsers } from '@/hooks/useUsers';
import UserList from '@/components/users/UserList/UserList';
import SearchBar from '@/components/common/Search/SearchBar';
import AddUserForm from '@/components/users/Actions/AddUserForm';
import HeaderSection from '@/components/common/Layout/HeaderSection';

export default function Home() {
  const { users, loading, addUser, deleteUser, updateUser, searchTerm, setSearchTerm } = useUsers();

  return (
    <main className="container mx-auto px-4 py-8">
      <HeaderSection title='Gerenciamento de Usuários'
        description='Visualize, adicione, exclua e gerencie usuários da plataforma.'/>

      <SearchBar 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm} />

      <UserList 
        users={users}
        onDelete={deleteUser}
        onUpdateUser={updateUser}
        loading={loading} />

      <AddUserForm onAddUser={addUser} />
    </main>
  );
}