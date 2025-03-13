// pages/user/[id]/page.tsx
'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { User } from '@/types/User';
import { getUsers } from '@/utils/storage';
import LoadingSpinner from '@/components/LoadingSpinner';
import UserNotFound from '@/components/UserNotFound';
import BackButton from '@/components/BackButton';
import UserAvatar from '@/components/UserAvatar';
import UserHeader from '@/components/UserHeader';
import UserDetailsLayout from '@/components/UserDetailsLayout';
import UserDetailsCard from '@/components/UserDetailsCard';
import UserDetailsGrid from '@/components/UserDetailsGrid';
import UserInfoSection from '@/components/UserInfoSection';
import UserInfoItem from '@/components/UserInfoItem';

interface UserDetailsPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailsPage({ params }: UserDetailsPageProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const userId = parseInt(params.id, 10);

  useEffect(() => {
    async function loadUser () {
      try {
        const users = getUsers();
        const foundUser = users.find(u => u.id === userId);
        
        if (foundUser) {
          setUser(foundUser);
        } else {
          // Usuário não encontrado
          setTimeout(() => {
            router.push('/');
          }, 3000);
        }
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, [userId, router]);

  if (loading) {
    return <LoadingSpinner />;
  }

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
          <UserHeader name={user.name} username={user.username} email={user.email} />
        </div>

        <UserDetailsGrid>
          <UserInfoSection title="Informações de Contato">
            <UserInfoItem label="Telefone" value={user.phone || 'Não informado'} />
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
            />
          </UserInfoSection>

          <UserInfoSection title="Empresa">
            <UserInfoItem label="Nome da Empresa" value={user.company?.name || 'Não informado'} />
            <UserInfoItem label="Slogan" value={user.company?.catchPhrase || 'Não informado'} />
          </UserInfoSection>

          <UserInfoSection title="Endereço">
            <UserInfoItem label="Rua" value={user.address?.street || 'Não informado'} />
            <UserInfoItem label="Complemento" value={user.address?.suite || 'Não informado'} />
            <div className="grid grid-cols-2 gap-3">
              <UserInfoItem label="Cidade" value={user.address?.city || 'Não informado'} />
              <UserInfoItem label="CEP" value={user.address?.zipcode || 'Não informado'} />
            </div>
          </UserInfoSection>
        </UserDetailsGrid>
      </UserDetailsCard>
    </UserDetailsLayout>
  );
}


// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/navigation';
// import * as Avatar from '@radix-ui/react-avatar';
// import { User } from '@/types/User';
// import { getUsers } from '@/utils/storage';

// interface UserDetailsPageProps {
//   params: {
//     id: string;
//   };
// }

// export default function UserDetailsPage({ params }: UserDetailsPageProps) {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();
//   const userId = parseInt(params.id, 10);

//   useEffect(() => {
//     function loadUser () {
//       try {
//         const users = getUsers();
//         const foundUser = users.find(u => u.id === userId);
        
//         if (foundUser) {
//           setUser(foundUser);
//         } else {
//           // Usuário não encontrado
//           setTimeout(() => {
//             router.push('/');
//           }, 3000);
//         }
//       } catch (error) {
//         console.error('Erro ao carregar usuário:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadUser();
//   }, [userId, router]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-screen dark:bg-gray-900">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (!user) {
//     return (
//       <div className="container mx-auto px-4 py-16 text-center dark:bg-gray-900">
//         <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Usuário não encontrado</h2>
//         <p className="text-gray-600 dark:text-gray-300 mb-8">O usuário que você está procurando não existe ou foi removido.</p>
//         <p className="text-gray-600 dark:text-gray-300 mb-4">Redirecionando para a página inicial...</p>
//         <Link 
//           href="/" 
//           className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
//         >
//           Voltar para a página inicial
//         </Link>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8 dark:bg-gray-900 dark:text-gray-100">
//       <div className="mb-6">
//         <Link 
//           href="/" 
//           className="inline-flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
//         >
//           <svg
//             className="mr-2 w-4 h-4"
//             fill="currentColor"
//             viewBox="0 0 20 20"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               fillRule="evenodd"
//               d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
//               clipRule="evenodd"
//             />
//           </svg>
//           Voltar para a lista de usuários
//         </Link>
//       </div>

//       <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
//         <div className="p-6 sm:p-8">
//           <div className="flex flex-col sm:flex-row items-center sm:items-start mb-8">
//             <Avatar.Root className="w-24 h-24 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 mb-4 sm:mb-0 sm:mr-6 flex-shrink-0">
//               <Avatar.Image
//                 src={user.avatar || `https://ui-avatars.com/api/?name=${user.name}&background=random&size=128`}
//                 alt={user.name}
//                 className="w-full h-full object-cover"
//               />
//               <Avatar.Fallback className="w-full h-full flex items-center justify-center bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-2xl">
//                 {user.name.substring(0, 2).toUpperCase()}
//               </Avatar.Fallback>
//             </Avatar.Root>
            
//             <div className="text-center sm:text-left">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-2">{user.name}</h1>
//               <p className="text-lg text-gray-600 dark:text-gray-300 mb-1">@{user.username}</p>
//               <p className="text-gray-600 dark:text-gray-300 flex items-center justify-center sm:justify-start">
//                 <svg
//                   className="w-4 h-4 mr-1 text-gray-500 dark:text-gray-400"
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
//                   <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
//                 </svg>
//                 {user.email}
//               </p>
//             </div>
//           </div>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-gray-700">Informações de Contato</h2>
              
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Telefone</p>
//                   <p className="text-gray-900 dark:text-gray-100">{user.phone || 'Não informado'}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Website</p>
//                   <p className="text-gray-900 dark:text-gray-100">
//                     {user.website ? (
//                       <a
//                         href={`https://${user.website}`}
//                         target="_blank"
//                         rel="noopener noreferrer"
//                         className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline"
//                       >
//                         {user.website}
//                       </a>
//                     ) : (
//                       'Não informado'
//                     )}
//                   </p>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-gray-700">Empresa</h2>
              
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Nome da Empresa</p>
//                   <p className="text-gray-900 dark:text-gray-100">{user.company?.name || 'Não informado'}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Slogan</p>
//                   <p className="text-gray-900 dark:text-gray-100 italic">{user.company?.catchPhrase || 'Não informado'}</p>
//                 </div>
//               </div>
//             </div>
            
//             <div>
//               <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4 pb-2 border-b dark:border-gray-700">Endereço</h2>
              
//               <div className="space-y-3">
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Rua</p>
//                   <p className="text-gray-900 dark:text-gray-100">{user.address?.street || 'Não informado'}</p>
//                 </div>
                
//                 <div>
//                   <p className="text-sm text-gray-500 dark:text-gray-400">Complemento</p>
//                   <p className="text-gray-900 dark:text-gray-100">{user.address?.suite || 'Não informado'}</p>
//                 </div>
                
//                 <div className="grid grid-cols-2 gap-3">
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">Cidade</p>
//                     <p className="text-gray-900 dark:text-gray-100">{user.address?.city || 'Não informado'}</p>
//                   </div>
                  
//                   <div>
//                     <p className="text-sm text-gray-500 dark:text-gray-400">CEP</p>
//                     <p className="text-gray-900 dark:text-gray-100">{user.address?.zipcode || 'Não informado'}</p>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }