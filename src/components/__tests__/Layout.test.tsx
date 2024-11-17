import { Layout } from "@/components/Layout";
import { MockProviders } from "@/mock/mockProviders";
import { render, screen } from "@testing-library/react";

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

const renderWithContext = (
  children: React.ReactNode,
  contextValue = defaultUsersContext,
) =>
  render(
    <MockProviders mockUsersValue={contextValue}>
      <Layout>{children}</Layout>
    </MockProviders>,
  );

describe("Layout component", () => {
  it("renders correctly", () => {
    renderWithContext(<div>Test</div>);
    expect(screen.getByText("Test")).toBeInTheDocument();
  });
});
