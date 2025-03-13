import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeToggle from '@/components/ThemeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Cibra - Gerenciamento de Usuários',
  description: 'Aplicação de gerenciamento de usuários para o desafio front-end da Cibra',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="dark"> {/* Adicione a classe 'dark' aqui para forçar o tema escuro */}
      <body className={`${inter.className} bg-gray-50 dark:bg-gray-900 min-h-screen`}>
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="container mx-auto px-4 py-4 flex items-center justify-between">
            <h1 className="text-xl font-bold text-blue-600 dark:text-blue-400">Cibra Users</h1>
            <ThemeToggle />
          </div>
        </header>
        {children}
      </body>
    </html>
  );
}