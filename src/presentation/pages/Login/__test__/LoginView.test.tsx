import { render, screen } from "@testing-library/react";
import Login from "../View";

jest.mock("@/presentation/components", () => {
  const MockAuthHeader = jest.fn(() => <div data-testid="AuthHeader" />);
  (MockAuthHeader as React.FC).displayName = "AuthHeader";

  const MockFormLink = jest.fn(() => <div data-testid="FormLink" />);
  (MockFormLink as React.FC).displayName = "FormLink";

  return {
    AuthHeader: MockAuthHeader,
    FormLink: MockFormLink,
  };
});

jest.mock("../components/login-form/LoginForm", () => {
  const MockLoginForm = () => <div>Mocked LoginForm</div>;
  MockLoginForm.displayName = "LoginForm";
  return MockLoginForm;
});

describe("Login Component", () => {
  it("should render the AuthHeader component", () => {
    render(<Login />);

    expect(screen.getByTestId("AuthHeader")).toBeInTheDocument();
  });
});
