'use client';

import React from 'react';
import { useUsers } from '@/hooks/useUsers';
import UserList from '@/components/UserList';
import SearchBar from '@/components/SearchBar';
import AddUserForm from '@/components/AddUserForm';

export default function Home() {
  const { users, loading, addUser, deleteUser, searchTerm, setSearchTerm } = useUsers();

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          Gerenciamento de Usuários
        </h1>
        <p className="text-gray-600 dark:text-gray-300">
          Visualize, adicione, exclua e gerencie usuários da plataforma.
        </p>
      </div>

      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

      <UserList users={users} onDelete={deleteUser} loading={loading} />

      <AddUserForm onAddUser={addUser} />
    </main>
  );
}