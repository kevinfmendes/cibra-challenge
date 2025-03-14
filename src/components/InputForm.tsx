import { UseFormRegister, FieldError } from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const InputForm: React.FC<InputProps> = ({
  id,
  label,
  type = 'text',
  register,
  errors,
  required = false,
  placeholder = '',
  className = '',
}) => {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
        {label}
        {required && <span className="text-red-600">*</span>}
      </label>
      <input
        id={id}
        type={type}
        {...register(id, { required: required ? `${label} é obrigatório` : false })}
        placeholder={placeholder}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
      />
      {errors && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
      )}
    </div>
  );
};

export default InputForm;