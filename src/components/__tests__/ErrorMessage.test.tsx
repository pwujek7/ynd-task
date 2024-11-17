import { render, screen } from "@testing-library/react";
import { ErrorMessage } from "@/components/ErrorMessage";

describe("ErrorMessage component", () => {
  it("renders the default error message when no message is provided", () => {
    render(<ErrorMessage />);
    expect(
      screen.getByText("Something went wrong. Please try again later."),
    ).toBeInTheDocument();
  });

  it("renders a custom error message when the 'message' prop is provided", () => {
    const customMessage = "Custom error occurred!";

    render(<ErrorMessage message={customMessage} />);
    expect(
      screen.getByText(`An error has occurred: ${customMessage}`),
    ).toBeInTheDocument();
  });
});
