import { fetchUsers } from "@/api/users";
import { Button } from "@/components/ui/button";
import { TIME } from "@/const/time";
import { User, UsersResponse } from "@/interfaces/users";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";

function Users() {
  const [username, setUsername] = useState<string>("");
  const [searchTerm, setSearchTerm] = useState<string>("");

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
    refetch,
  }: UseQueryResult<UsersResponse, Error> = useQuery({
    queryKey: ["users", searchTerm],
    queryFn: () => fetchUsers(searchTerm),
    enabled: false,
    staleTime: TIME.ONE_HOUR,
  });

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    setSearchTerm(username);
    setUsername("");
  };

  if (isUsersLoading) return <p>"Loading..."</p>;

  if (isUsersError)
    return <p>{"An error has occurred: " + usersError.message}</p>;

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button type="submit">Search</Button>
      </form>
      <ul>
        {users?.items.map((user: User) => (
          <li key={user.id}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width={50}
              height={50}
            />
            <p>{user.login}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
