import { LoadingIndicator } from "@/components/LoadingIndicator";
import { render, screen } from "@/test-utils";

describe("LoadingIndicator component", () => {
  it("renders correctly", () => {
    render(<LoadingIndicator />);
    expect(screen.getByTestId("loading-icon")).toBeInTheDocument();
  });
});
