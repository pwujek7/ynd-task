import { THEME } from "@/const/theme";
import { ThemeContext } from "@/context/ThemeContext";
import { UserContext } from "@/context/UserContext";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const AppProviders = ({
  children,
  mockUsersValue,
}: {
  children: React.ReactNode;
  mockUsersValue: any;
}) => {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <UserContext.Provider value={mockUsersValue}>
        <ThemeContext.Provider
          value={{ theme: THEME.LIGHT, toggleTheme: jest.fn() }}
        >
          {children}
        </ThemeContext.Provider>
      </UserContext.Provider>
    </QueryClientProvider>
  );
};
