import { render, screen } from "@testing-library/react";
import Users from "@/pages/Users";
import { ThemeProvider } from "@/context/ThemeContext";
import { UserProvider } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

describe("Users component", () => {
  test("renders correctly", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <UserProvider>
          <ThemeProvider>
            <Users />
          </ThemeProvider>
        </UserProvider>
      </QueryClientProvider>,
    );

    const searchForm = screen.getByTestId("users-search-form");
    expect(searchForm).toBeInTheDocument();

    const usersList = screen.getByTestId("users-list");
    expect(usersList).toBeInTheDocument();
  });
});
