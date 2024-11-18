import { render, screen } from "@/test-utils";

const defaultUsersContext = {
  users: {
    data: {
      items: [],
    },
    isLoading: false,
    isError: false,
    error: null,
  },
  repositories: {
    data: [],
    isLoading: false,
    isError: false,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
  },
  selectedUser: "",
  setSelectedUser: jest.fn(),
};

describe("Layout component", () => {
  it("renders correctly", () => {
    render(<div>Test</div>, {
      mockUsersValue: defaultUsersContext,
    });
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
