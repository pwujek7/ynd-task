import useUserContext from "@/context/UserContext";
import { User } from "@/interfaces/user";
import { UserItem } from "@/pages/components/UserItem";

export function UsersList() {
  const {
    users: { data, isLoading, isError, error },
  } = useUserContext();

  if (isError) return <p>{"An error has occurred: " + error?.message}</p>;

  return (
    <div>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        data && (
          <>
            {data?.items.map((user: User) => (
              <UserItem key={user.id} user={user} />
            ))}
          </>
        )
      )}
    </div>
  );
}
