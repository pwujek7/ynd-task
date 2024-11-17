import { RepositoryItem } from "@/pages/components/RepositoryItem";
import { render, screen } from "@testing-library/react";

describe("RepositoryItem component", () => {
  const repository = {
    id: 1,
    name: "test repo",
    description: "A simple test repo",
    stargazers_count: 120,
  };

  it("renders correctly", () => {
    render(<RepositoryItem repository={repository} />);

    const name = screen.getByText("test repo");
    expect(name).toBeInTheDocument();
  });
});
