import AddUserForm from '@/components/users/Actions/AddUserForm';
import UserNotFound from '@/components/users/UserList/UserNotFound';
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