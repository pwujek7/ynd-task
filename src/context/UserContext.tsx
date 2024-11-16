import { createContext, useContext, useState, ReactNode } from "react";
import { RepositoryResponse } from "@/interfaces/repository";
import { UsersResponse } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";
import { fetchUserRepositories, fetchUsers } from "@/api/user";
import { TIME } from "@/const/time";

interface QueryState<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

interface UserContextType {
  users: QueryState<UsersResponse>;
  repositories: QueryState<RepositoryResponse>;
  selectedUser: string;
  setSearchTerm: (username: string) => void;
  setSelectedUser: (username: string) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [selectedUser, setSelectedUser] = useState<string>("");

  const {
    data: users,
    isLoading: isUsersLoading,
    isError: isUsersError,
    error: usersError,
  } = useQuery<UsersResponse, Error>({
    queryKey: ["users", searchTerm],
    queryFn: () => fetchUsers(searchTerm),
    enabled: !!searchTerm,
    staleTime: TIME.ONE_HOUR,
  });

  const {
    data: repositories,
    isLoading: isRepositoriesLoading,
    isError: isRepositoriesError,
    error: repositoriesError,
  } = useQuery<RepositoryResponse, Error>({
    queryKey: ["userRepositories", selectedUser],
    queryFn: () => fetchUserRepositories(selectedUser),
    enabled: !!selectedUser,
    staleTime: TIME.ONE_MINUTE,
  });

  return (
    <UserContext.Provider
      value={{
        users: {
          data: users,
          isLoading: isUsersLoading,
          isError: isUsersError,
          error: usersError,
        },
        repositories: {
          data: repositories,
          isLoading: isRepositoriesLoading,
          isError: isRepositoriesError,
          error: repositoriesError,
        },
        selectedUser,
        setSearchTerm,
        setSelectedUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

const useUserContext = () => {
  const context = useContext(UserContext);

  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }

  return context;
};

export default useUserContext;
