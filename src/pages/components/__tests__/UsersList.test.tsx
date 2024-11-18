import { UsersList } from "@/pages/components/UsersList";
import { render, screen, waitFor } from "@/test-utils";

describe("UsersList component", () => {
  it("should show loading indicator when data is loading", () => {
    const users = {
      users: {
        data: null,
        isLoading: true,
        isError: false,
        error: null,
      },
    };

    render(<UsersList />, {
      mockUsersValue: users,
    });
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });

  it("should show error message when there is an error", async () => {
    const errorMessage = "Something went wrong. Please try again later.";
    const users = {
      users: {
        data: null,
        isLoading: false,
        isError: true,
        error: null,
      },
    };

    render(<UsersList />, {
      mockUsersValue: users,
    });
    const errorElement = await screen.findByText(errorMessage);
    expect(errorElement).toBeInTheDocument();
  });

  it("should render a list of users when data is available", async () => {
    const users = {
      users: {
        data: {
          items: [{ login: "John Doe" }],
        },
        isLoading: false,
        isError: false,
        error: null,
      },
      repositories: {},
    };

    render(<UsersList />, {
      mockUsersValue: users,
    });
    await waitFor(() => {
      expect(screen.getByText("John Doe")).toBeInTheDocument();
    });
  });
});
