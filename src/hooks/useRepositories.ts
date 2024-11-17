import { fetchUserRepositories } from "@/api/user";
import { TIME } from "@/const/time";
import { RepositoryResponse } from "@/interfaces/repository";
import { useInfiniteQuery } from "@tanstack/react-query";

export const useRepositories = (selectedUser: string) => {
  return useInfiniteQuery<RepositoryResponse[], Error>({
    queryKey: ["userRepositories", selectedUser],
    //@ts-ignore
    queryFn: async ({ pageParam }: { pageParam?: number }) =>
      fetchUserRepositories(selectedUser, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === 10 ? allPages.length + 1 : undefined,
    enabled: !!selectedUser,
    staleTime: TIME.ONE_MINUTE,
  });
};
