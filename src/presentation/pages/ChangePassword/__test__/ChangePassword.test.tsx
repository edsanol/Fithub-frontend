import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ChangePassword from "../View";

jest.mock("@/presentation/components", () => ({
  AuthHeader: () => <div>Mocked AuthHeader</div>,
}));

jest.mock("../components/change-password-form/ChangePasswordForm", () => ({
  __esModule: true,
  default: () => <div>Mocked ChangePasswordForm</div>,
}));

describe("ChangePassword Component", () => {
  it("should render the AuthHeader and ChangePasswordForm", () => {
    render(<ChangePassword />);
    expect(screen.getByText("Mocked AuthHeader")).toBeInTheDocument();
    expect(screen.getByText("Mocked ChangePasswordForm")).toBeInTheDocument();
  });
});
