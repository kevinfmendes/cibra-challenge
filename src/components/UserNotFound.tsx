import React from 'react';
import Link from 'next/link';

const UserNotFound: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-16 text-center dark:bg-gray-900">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Usuário não encontrado</h2>
      <p className="text-gray-600 dark:text-gray-300 mb-8">O usuário que você está procurando não existe ou foi removido.</p>
      <p className="text-gray-600 dark:text-gray-300 mb-4">Redirecionando para a página inicial...</p>
      <Link 
        href="/" 
        className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
      >
        Voltar para a página inicial
      </Link>
    </div>
  );
};

export default UserNotFound;