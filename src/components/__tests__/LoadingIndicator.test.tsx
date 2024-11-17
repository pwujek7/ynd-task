import { LoadingIndicator } from "@/components/LoadingIndicator";
import { render, screen } from "@testing-library/react";

describe("LoadingIndicator component", () => {
  it("renders correctly", () => {
    render(<LoadingIndicator />);
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });
});
