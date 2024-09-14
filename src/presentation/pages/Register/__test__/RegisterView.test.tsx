import { render, screen } from "@testing-library/react";
import Register from "../View";

jest.mock("@/presentation/components", () => ({
  AuthHeader: jest.fn(() => <div data-testid="auth-header" />),
}));

jest.mock("../components/register-form/RegisterForm", () =>
  jest.fn(() => <div data-testid="register-form" />)
);

describe("Register Component", () => {
  it("should render the AuthHeader component", () => {
    render(<Register />);

    expect(screen.getByTestId("auth-header")).toBeInTheDocument();
  });
});
