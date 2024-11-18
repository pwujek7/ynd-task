import { ReactElement } from "react";
import { render, RenderOptions } from "@testing-library/react";
import { AppProviders } from "@/providers/appProviders";

const customRender = (
  ui: ReactElement,
  {
    mockUsersValue = {},
    ...options
  }: Omit<RenderOptions, "wrapper"> & { mockUsersValue?: any } = {},
) =>
  render(ui, {
    wrapper: ({ children }) => (
      <AppProviders mockUsersValue={mockUsersValue}>{children}</AppProviders>
    ),
    ...options,
  });

export * from "@testing-library/react";
export { customRender as render };
