import useUserContext from "@/context/UserContext";
import { User } from "@/interfaces/user";
import { UserItem } from "@/pages/components/UserItem";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { ErrorMessage } from "@/components/ErrorMessage";

export function UsersList() {
  const {
    users: { data, isLoading, isError, error },
  } = useUserContext();

  if (isError) return <ErrorMessage message={error?.message} />;

  return (
    <div className="flex-grow" data-testid="users-list">
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        data &&
        data?.items.map((user: User) => <UserItem key={user.id} user={user} />)
      )}
    </div>
  );
}
