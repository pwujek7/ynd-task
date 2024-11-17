import { render, screen } from "@testing-library/react";
import { User } from "@/interfaces/user";
import { UserItem } from "@/pages/components/UserItem";
import { MockProviders } from "@/mock/mockProviders";

const mockUser: User = {
  id: 1,
  login: "John Doe",
  html_url: "test html url",
  avatar_url: "test url",
};

const mockRepositories = [
  { id: 1, name: "repo 1", stargazers_count: 1 },
  { id: 2, name: "repo 2", stargazers_count: 2 },
];

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
    data: mockRepositories,
    isLoading: false,
    isError: false,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
  },
  selectedUser: "",
  setSelectedUser: jest.fn(),
};

const renderWithContext = (user: User, contextValue = defaultUsersContext) =>
  render(
    <MockProviders mockUsersValue={contextValue}>
      <UserItem user={user} />
    </MockProviders>,
  );

describe("UserItem component", () => {
  it("renders correctly", () => {
    renderWithContext(mockUser);
    expect(screen.getByText("John Doe")).toBeInTheDocument();
  });

  it("displays loading indicator while loading repositories", () => {
    const loadingContext = {
      ...defaultUsersContext,
      repositories: {
        ...defaultUsersContext.repositories,
        isLoading: true,
      },
      selectedUser: "John Doe",
    };

    renderWithContext(mockUser, loadingContext);

    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  it("shows error message if there is an error", async () => {
    const errorMessage = "Something went wrong. Please try again later.";
    const errorContext = {
      ...defaultUsersContext,
      repositories: {
        ...defaultUsersContext.repositories,
        isError: true,
      },
    };

    renderWithContext(mockUser, errorContext);

    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
