import { UsersSearchForm } from "@/pages/components/UsersSearchForm";
import { UsersList } from "@/pages/components/UsersList";

function Users() {
  return (
    <div>
      <UsersSearchForm />
      <UsersList />
    </div>
  );
}

export default Users;
