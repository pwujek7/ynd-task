import { RepositoriesList } from "@/pages/components/RepositoriesList";
import { render, screen, waitFor } from "@/test-utils";

const mockUser = {
  id: 1,
  login: "John Doe",
  html_url: "test html url",
  avatar_url: "test url",
};

const mockRepositories = [{ id: 1, name: "repo 1", stargazers_count: 1 }];

const defaultUsersContext = {
  users: {
    data: {
      items: [{ ...mockUser }],
    },
    isLoading: false,
    isError: false,
    error: null,
  },
  repositories: {
    data: [],
    isLoading: true,
    isError: false,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
  },
  selectedUser: "John Doe",
  setSelectedUser: jest.fn(),
};

describe("RepositoriesList component", () => {
  it("should show loading indicator when data is loading", () => {
    render(<RepositoriesList userLogin="John Doe" />, {
      mockUsersValue: defaultUsersContext,
    });
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  it("should render a list of repositories when data is available", async () => {
    render(<RepositoriesList userLogin="John Doe" />, {
      mockUsersValue: {
        ...defaultUsersContext,
        repositories: {
          ...defaultUsersContext.repositories,
          data: [...mockRepositories],
          isLoading: false,
        },
      },
    });
    await waitFor(() => {
      expect(screen.getByText("repo 1")).toBeInTheDocument();
    });
  });
});
