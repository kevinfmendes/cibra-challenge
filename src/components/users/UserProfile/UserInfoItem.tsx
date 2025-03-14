import InputFormDetails from '../../common/Form/InputFormDetails';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface UserInfoItemProps {
  label: string;
  value: string | React.ReactNode;
  isEditing?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
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

const UserInfoItem: React.FC<UserInfoItemProps> = ({ 
  label, 
  value, 
  isEditing = false, 
  onChange,
  name,
  required = false,
  register,
  errors,
  mask,
  onCepFetch,
  maxlength
}) => {
  const displayValue = typeof value === 'string' ? value : '';
  const fieldId = name || label.toLowerCase().replace(/\s+/g, '_');
  
  const handleChange = (value: string) => {
    if (onChange) {
      onChange(value); // Chamar a função onChange personalizada
    }
  };

  return (
    <div>
      {isEditing ? (
        <InputFormDetails
          id={fieldId}
          label={label}
          value={displayValue}
          onChange={handleChange}
          required={required}
          register={register}
          errors={errors}
          mask={mask}
          onCepFetch={onCepFetch}
          maxlength={maxlength}
        />
      ) : (
        <>
          <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
          <p className="text-gray-900 dark:text-gray-100">{value}</p>
        </>
      )}
    </div>
  );
};

export default UserInfoItem;