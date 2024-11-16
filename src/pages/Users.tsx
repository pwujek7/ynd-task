import { fetchUserRepositories, fetchUsers } from "@/api/user";
import { TIME } from "@/const/time";
import { Repository, RepositoryResponse } from "@/interfaces/repository";
import { User, UsersResponse } from "@/interfaces/user";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { UsersSearchForm } from "@/pages/components/UsersSearchForm";

function Users() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

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

  const {
    data: repositories,
    isLoading: isRepositoriesLoading,
    isError: isRepositoriesError,
    error: repositoriesError,
  }: UseQueryResult<RepositoryResponse, Error> = useQuery({
    queryKey: ["userRepositories", selectedUser],
    queryFn: () => fetchUserRepositories(selectedUser),
    enabled: !!selectedUser,
    staleTime: TIME.ONE_MINUTE,
  });

  useEffect(() => {
    if (searchTerm) {
      refetch();
    }
  }, [searchTerm, refetch]);

  const handleSearchSubmit = (username: string) => {
    setSearchTerm(username);
  };

  const handleUserClick = (username: string) => {
    setSelectedUser(username);
  };

  if (isUsersLoading) return <p>"Loading..."</p>;

  if (isUsersError)
    return <p>{"An error has occurred: " + usersError.message}</p>;

  return (
    <div>
      <UsersSearchForm onSubmit={handleSearchSubmit} />
      <ul>
        {users?.items.map((user: User) => (
          <li key={user.id} onClick={() => handleUserClick(user.login)}>
            <img
              src={user.avatar_url}
              alt={user.login}
              width={50}
              height={50}
            />
            <p>{user.login}</p>
            <div>
              {isRepositoriesLoading && <p>Loading...</p>}
              {repositories && selectedUser === user.login && (
                <div>
                  <ul>
                    {repositories.map((repo: Repository) => (
                      <li key={repo.id}>
                        <p>{repo.name}</p>
                        <p>{repo.description}</p>
                        <p>{repo.stargazers_count}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Users;
