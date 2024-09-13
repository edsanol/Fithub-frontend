import { render, screen } from "@testing-library/react";
import Login from "../View";

jest.mock("@/presentation/components", () => ({
  AuthHeader: jest.fn(() => <div data-testid="AuthHeader" />),
  FormLink: jest.fn(() => <div data-testid="FormLink" />),
}));
jest.mock("../components/login-form/LoginForm", () => () => (
  <div>Mocked LoginForm</div>
));

describe("Login Component", () => {
  it("should render the AuthHeader component", () => {
    render(<Login />);

    expect(screen.getByTestId("AuthHeader")).toBeInTheDocument();
  });
});
