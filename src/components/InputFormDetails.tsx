import { UseFormRegister, FieldError } from 'react-hook-form';

interface InputFormDetailsProps {
  id: string;
  label: string;
  value?: string;
  onChange?: (value: string) => void;
  type?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  register?: UseFormRegister<any>; // Adicionando suporte para register
  errors?: FieldError; // Adicionando suporte para errors
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
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e.target.value);
    }
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      {register ? (
        // Usando register do react-hook-form
        <input
          id={id}
          type={type}
          {...register(id, { required: required ? `${label} é obrigatório` : false })}
          placeholder={placeholder}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
        />
      ) : (
        // Caso register não seja fornecido, use o onChange padrão
        <input
          id={id}
          type={type}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
        />
      )}
      {errors && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
      )}
    </div>
  );
};

export default InputFormDetails;