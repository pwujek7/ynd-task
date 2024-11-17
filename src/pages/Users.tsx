import { Layout } from "@/components/Layout";
import { UsersSearchForm } from "@/pages/components/UsersSearchForm";
import { UsersList } from "@/pages/components/UsersList";

function Users() {
  return (
    <Layout>
      <UsersSearchForm />
      <UsersList />
    </Layout>
  );
}

export default Users;
