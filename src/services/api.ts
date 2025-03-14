import axios from 'axios';
import { User } from '@/types/User';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

export const fetchUsers = async (): Promise<User[]> => {
  const response = await api.get('/users');
  return response.data;
};

export const fetchUserById = async (id: number): Promise<User> => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export async function fetchAddressByCep(cep: string): Promise<{
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
  complemento: string;
} | undefined> {
  const formattedCep = cep.replace(/\D/g, '');
  
  if (formattedCep.length !== 8) {
    throw new Error('CEP inválido. Deve conter 8 dígitos.');
  }
  
  try {
    const response = await fetch(`https://viacep.com.br/ws/${formattedCep}/json/`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar CEP');
    }
    
    const data = await response.json();
    
    if (data.erro) {
      console.log('CEP não encontrado');
    }
    
    return data;
  } catch (error) {
    console.error('Erro ao buscar endereço:', error);
    return undefined;
  }
}