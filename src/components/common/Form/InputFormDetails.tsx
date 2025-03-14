import { UseFormRegister, FieldError } from 'react-hook-form';
import { useState, useEffect } from 'react';
import { fetchAddressByCep } from '@/services/api';

interface InputFormDetailsProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  register?: UseFormRegister<any>;
  errors?: FieldError;
  mask?: 'cep' | 'phone';
  onCepFetch?: (address: {
    logradouro: string;
    bairro: string;
    localidade: string;
    uf: string;
    complemento: string;
  }) => void;
  maxlength?: number;
}

const InputFormDetails: React.FC<InputFormDetailsProps> = ({
  id,
  label,
  value,
  onChange,
  type = 'text',
  required = false,
  placeholder = '',
  className = '',
  register,
  errors,
  mask,
  onCepFetch,
  maxlength,
}) => {

  const [inputValue, setInputValue] = useState(value || '');

  const applyCepMask = (value: string) => {
    const numbers = value.replace(/\D/g, '').substring(0, 8);

    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 5) {
      return numbers.replace(/^(\d{2})(\d{0,3})/, '$1.$2');
    } else {
      return numbers.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2-$3');
    }
  };

  const applyPhoneMask = (value: string) => {
    const numbers = value.replace(/\D/g, '').substring(0, 11);

    if (numbers.length <= 2) {
      return numbers.length ? `(${numbers}` : '';
    } else if (numbers.length <= 3) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2)}`;
    } else if (numbers.length <= 7) {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 3)} ${numbers.substring(3)}`;
    } else {
      return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 3)} ${numbers.substring(3, 7)}-${numbers.substring(7)}`;
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let newValue = e.target.value;

    if (mask === 'cep') {
      newValue = applyCepMask(newValue);
    } else if (mask === 'phone') {
      newValue = applyPhoneMask(newValue);
    }

    setInputValue(newValue);

    if (onChange) {
      onChange(newValue);
    }

    if (mask === 'cep' && newValue.replace(/\D/g, '').length === 8) {
        fetchCep(newValue.replace(/\D/g, ''));
    }
  };

  async function fetchCep (cep: string) {
    try {
      const address = await fetchAddressByCep(cep);
      if (address && address.logradouro) {
        if (onCepFetch) {
          onCepFetch(address);
        }
      } else {
        console.log('CEP não encontrado');
      }
    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
    }
  };

  useEffect(() => {
    setInputValue(value || '');
  }, [value]);

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      {register ? (
        <input
          id={id}
          type={type}
          {...register(id, { required: required ? `${label} é obrigatório` : false, onChange: handleChange})}
          placeholder={placeholder}
          value={inputValue} 
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
          maxLength={maxlength}
        />
      ) : (
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
          maxLength={maxlength}
        />
      )}
      {errors && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
      )}
    </div>
  );
};

export default InputFormDetails;