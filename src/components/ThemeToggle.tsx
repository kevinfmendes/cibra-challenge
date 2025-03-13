'use client'; // Marque como componente do lado do cliente

import { useEffect, useState } from 'react';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  // Verifica o tema salvo no localStorage ao carregar o componente
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    } else {
      setDarkMode(false);
      document.documentElement.classList.remove('dark');
    }
  }, []);

  // Alterna entre os modos claro e escuro
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-lg bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white"
    >
      {darkMode ? '🌙' : '☀️'}
    </button>
  );
};

export default ThemeToggle;