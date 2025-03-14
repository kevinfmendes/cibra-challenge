import InputFormDetails from './InputFormDetails';
import { UseFormRegister, FieldError } from 'react-hook-form';

interface UserInfoItemProps {
  label: string;
  value: string | React.ReactNode;
  isEditing?: boolean;
  onChange?: (value: string) => void;
  name?: string;
  required?: boolean;
  register?: UseFormRegister<any>; // Adicionando suporte para register
  errors?: FieldError; // Adicionando suporte para errors
}

const UserInfoItem: React.FC<UserInfoItemProps> = ({ 
  label, 
  value, 
  isEditing = false, 
  onChange,
  name,
  required = false,
  register,
  errors
}) => {
  // Para lidar com valores React.ReactNode (como links)
  const displayValue = typeof value === 'string' ? value : '';
  const fieldId = name || label.toLowerCase().replace(/\s+/g, '_');
  
  return (
    <div>
      {isEditing ? (
        <InputFormDetails
          id={fieldId}
          label={label}
          value={displayValue}
          onChange={(value) => onChange && onChange(value)}
          required={required}
          register={register} // Passando register para InputFormDetails
          errors={errors} // Passando errors para InputFormDetails
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