import { UserItem } from "@/pages/components/UserItem";
import { render, screen } from "@/test-utils";

const mockUser = {
  id: 1,
  login: "John Doe",
  html_url: "test html url",
  avatar_url: "test url",
};

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
    isLoading: false,
    isError: false,
    fetchNextPage: jest.fn(),
    hasNextPage: true,
    isFetchingNextPage: false,
  },
  selectedUser: "",
  setSelectedUser: jest.fn(),
};

describe("UserItem component", () => {
  it("renders correctly", () => {
    render(<UserItem user={mockUser} />, {
      mockUsersValue: defaultUsersContext,
    });
    expect(screen.getByText("John Doe")).toBeInTheDocument();
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

    render(<UserItem user={mockUser} />, {
      mockUsersValue: errorContext,
    });

    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });
});
