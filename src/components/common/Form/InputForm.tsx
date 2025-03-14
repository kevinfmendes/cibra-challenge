import { UseFormRegister, FieldError, Control, Controller} from 'react-hook-form';

interface InputProps {
  id: string;
  label: string;
  type?: string;
  register: UseFormRegister<any>;
  errors?: FieldError;
  required?: boolean;
  placeholder?: string;
  className?: string;
  mask?: string;
  control?: Control<any>;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  mask,
  control,
  onChange,
}) => {

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

  if (mask && control) {
    return (
      <div>
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          {label}
          {required && <span className="text-red-600">*</span>}
        </label>
        <Controller
          name={id}
          control={control}
          defaultValue=""
          rules={{ required: required ? `${label} é obrigatório` : false }}
          render={({ field }) => {
            return (
              <input
                id={id}
                type={type}
                value={field.value}
                onChange={(e) => {
                  let maskedValue = e.target.value;
                  
                  if (mask === 'cep') {
                    maskedValue = applyCepMask(e.target.value);
                  } else if (mask === 'phone') {
                    maskedValue = applyPhoneMask(e.target.value);
                  }
                  
                  field.onChange(maskedValue);
                  
                  if (mask === 'cep') {
                    const cepDigits = maskedValue.replace(/\D/g, '');
                    if (cepDigits.length === 8 && onChange) {
                      const syntheticEvent = {
                        target: { value: maskedValue }
                      } as React.ChangeEvent<HTMLInputElement>;
                      onChange(syntheticEvent);
                    }
                  }
                }}
                onBlur={field.onBlur}
                placeholder={placeholder}
                className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
              />
            );
          }}
        />
        {errors && (
          <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
        )}
      </div>
    );
  }

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
        onChange={(e) => {
          if (onChange) onChange(e);
        }}
        className={`w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white ${className}`}
      />
      {errors && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.message}</p>
      )}
    </div>
  );
};

export default InputForm;