import AddUserForm from '@/components/AddUserForm';
import UserNotFound from '@/components/UserNotFound';
import { useUsers } from '@/hooks/useUsers';
import { useRouter } from 'next/router';

const EditUserPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const { getUserById, updateUser } = useUsers();
  const user = getUserById(Number(id));

  if (!user) {
     return <UserNotFound />;
  }

  return (
    <AddUserForm
      user={user}
      onEditUser={updateUser}
    />
  );
};

export default EditUserPage;