import { LoadingIndicator } from "@/components/LoadingIndicator";
import { Button } from "@/components/ui/button";

type LoadMoreProps = {
  hasNextPage: boolean | undefined;
  isFetchingNextPage: boolean | undefined;
  onLoadMore: () => void;
};

export function LoadMore({
  hasNextPage,
  isFetchingNextPage,
  onLoadMore,
}: LoadMoreProps) {
  if (!hasNextPage && !isFetchingNextPage) return null;

  return (
    <div className="flex justify-center items-center">
      {hasNextPage && !isFetchingNextPage ? (
        <Button onClick={onLoadMore}>Load More</Button>
      ) : (
        <LoadingIndicator className="m-0" />
      )}
    </div>
  );
}
