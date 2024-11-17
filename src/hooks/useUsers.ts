import { fetchUsers } from "@/api/user";
import { TIME } from "@/const/time";
import { UsersResponse } from "@/interfaces/user";
import { useQuery } from "@tanstack/react-query";

export const useUsers = (searchTerm: string) => {
  return useQuery<UsersResponse, Error>({
    queryKey: ["users", searchTerm],
    queryFn: () => fetchUsers(searchTerm),
    enabled: !!searchTerm,
    staleTime: TIME.ONE_HOUR,
  });
};
