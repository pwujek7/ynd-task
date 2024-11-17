import useUserContext from "@/context/UserContext";
import { RepositoryItem } from "@/pages/components/RepositoryItem";
import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";
import { LoadMore } from "@/components/LoadMore";

type RepositoriesListProps = {
  userLogin: string;
};

export function RepositoriesList({ userLogin }: RepositoriesListProps) {
  const {
    repositories: {
      data,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage,
    },
    selectedUser,
  } = useUserContext();

  const handleLoadMore = (): void => {
    fetchNextPage();
  };

  const isLoadingForThisUser = selectedUser === userLogin && isLoading;
  const hasDataForSelectedUser = selectedUser === userLogin && data?.length;

  if (isLoadingForThisUser) {
    return <LoadingIndicator />;
  }

  return (
    <>
      {hasDataForSelectedUser ? (
        <>
          {data.map((repo: any) => (
            <RepositoryItem key={repo.id} repository={repo} />
          ))}
        </>
      ) : null}
      <LoadMore
        hasNextPage={hasNextPage}
        isFetchingNextPage={isFetchingNextPage}
        onLoadMore={handleLoadMore}
      />
    </>
  );
}
