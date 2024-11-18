import { LoadMore } from "@/components/LoadMore";
import { render, screen } from "@/test-utils";

describe("LoadMore component", () => {
  test("renders LoadingIndicator when isFetchingNextPage is true", () => {
    render(
      <LoadMore
        hasNextPage={true}
        isFetchingNextPage={true}
        onLoadMore={jest.fn()}
      />,
    );
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  test("renders 'Load More' button when hasNextPage is true and isFetchingNextPage is false", () => {
    render(
      <LoadMore
        hasNextPage={true}
        isFetchingNextPage={false}
        onLoadMore={jest.fn()}
      />,
    );
    expect(screen.getByText("Load More")).toBeInTheDocument();
  });
});
