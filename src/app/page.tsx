'use client';
import { useUsers } from '@/hooks/useUsers';
import UserList from '@/components/UserList';
import SearchBar from '@/components/SearchBar';
import AddUserForm from '@/components/AddUserForm';
import HeaderSection from '@/components/HeaderSection';

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