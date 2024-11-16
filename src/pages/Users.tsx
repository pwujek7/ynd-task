import { UsersSearchForm } from "@/pages/components/UsersSearchForm";
import { UsersList } from "@/pages/components/UsersList";

function Users() {
  return (
    <div className="container flex flex-col min-h-screen">
      <UsersSearchForm />
      <UsersList />
    </div>
  );
}

export default Users;
