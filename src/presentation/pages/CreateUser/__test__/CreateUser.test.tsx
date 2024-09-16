import { render, screen } from "@testing-library/react";
import CreateUser from "../View";

jest.mock("@/presentation/components", () => ({
  DashboardHeader: ({ title, description }: any) => (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  ),
}));

jest.mock("../components/create-user-form/CreateUserForm", () => ({
  __esModule: true,
  default: () => <div>Mocked CreateUserForm</div>,
}));

describe("CreateUser Component", () => {
  it("should render the dashboard header and the create user form", () => {
    render(<CreateUser />);

    // Check if the DashboardHeader is rendered with the correct title and description
    expect(
      screen.getByText("Configura el Perfil de tus Atletas")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Personaliza la información de tus deportistas")
    ).toBeInTheDocument();

    // Check if the CreateUserForm is rendered
    expect(screen.getByText("Mocked CreateUserForm")).toBeInTheDocument();
  });
});
