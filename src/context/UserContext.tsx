import { createContext, useContext, useState, ReactNode } from "react";
import { RepositoryResponse } from "@/interfaces/repository";
import { UsersResponse } from "@/interfaces/user";
import { useUsers } from "@/hooks/useUsers";
import { useRepositories } from "@/hooks/useRepositories";

interface QueryState<T> {
  data: T | undefined;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
}

interface UserContextType {
  users: QueryState<UsersResponse>;
  repositories: {
    data: RepositoryResponse[] | undefined;
    isLoading: boolean;
    isError: boolean;
    error: Error | null;
    fetchNextPage: () => void;
    hasNextPage: boolean | undefined;
    isFetchingNextPage: boolean;
  };
  selectedUser: string;
  setSearchTerm: (username: string) => void;
  setSelectedUser: (username: string) => void;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined,
);

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
  } = useUsers(searchTerm);

  const {
    data,
    isLoading: isRepositoriesLoading,
    isError: isRepositoriesError,
    error: repositoriesError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useRepositories(selectedUser);

  const repositoriesData = data?.pages.flat() ?? [];
  console.log(repositoriesData);

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
          data: repositoriesData as any,
          isLoading: isRepositoriesLoading,
          isError: isRepositoriesError,
          error: repositoriesError,
          fetchNextPage,
          hasNextPage,
          isFetchingNextPage,
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
