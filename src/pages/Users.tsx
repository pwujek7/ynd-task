import { UsersSearchForm } from "@/pages/components/UsersSearchForm";
import useUserContext from "@/context/UserContext";
import { User } from "@/interfaces/user";
import { Repository } from "@/interfaces/repository";

function Users() {
  const {
    users,
    isUsersLoading,
    isUsersError,
    usersError,
    repositories,
    isRepositoriesLoading,
    selectedUser,
    setSelectedUser,
  } = useUserContext();

  const handleUserClick = (username: string) => {
    setSelectedUser(username);
  };

  if (isUsersError)
    return <p>{"An error has occurred: " + usersError?.message}</p>;

  return (
    <div>
      <UsersSearchForm />
      {isUsersLoading ? (
        <p>Loading...</p>
      ) : (
        users && (
          <div>
            {users?.items.map((user: User) => (
              <div key={user.id} onClick={() => handleUserClick(user.login)}>
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
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
}

export default Users;
