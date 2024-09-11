import { fireEvent, render, screen } from "@testing-library/react";
import ViewModel from "../components/create-user-form/ViewModel";
import CreateUserForm from "../components/create-user-form/CreateUserForm";

jest.mock("../components/create-user-form/ViewModel", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockViewModel = {
  handleSubmit: jest.fn(),
  setField: jest.fn(),
  setErrorModal: jest.fn(),
  athleteIdValue: null,
  athleteData: {
    athleteName: "",
    athleteLastName: "",
    email: "",
    phoneNumber: "",
    genre: "",
    birthDate: "",
    registerDate: new Date().toISOString(),
    status: true,
    startDate: "",
    endDate: "",
    membershipName: "",
    cost: 0,
    membershipId: 0,
    cardAccessCode: "",
  },
  athleteDataError: {
    nameError: false,
    lastNameError: false,
    emailError: false,
    phoneNumberError: false,
    genreError: false,
    birthDateError: false,
  },
  membership: [],
  errorModal: false,
  errorMessage: "",
};

jest.mock("@/presentation/components", () => ({
  FormInput: ({
    label,
    errorMessage,
    isReadOnly,
    isInvalid,
    color,
  }: {
    label: string;
    errorMessage?: string;
    isReadOnly?: boolean;
    isInvalid?: boolean;
    color?: string;
  }) => (
    <div>
      <input aria-label={label} readOnly={isReadOnly} />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  ),
  FormInputPassword: ({
    label,
    errorMessage,
    isInvalid,
    color,
  }: {
    label: string;
    errorMessage?: string;
    isInvalid?: boolean;
    color?: string;
  }) => (
    <div>
      <input aria-label={label} type="password" />
      {isInvalid && <span style={{ color }}>{errorMessage}</span>}
    </div>
  ),
  FormSelect: ({
    label,
    items,
    value,
    placeholder,
  }: {
    label: string;
    items: { value: string; label: string }[];
    value?: string;
    placeholder?: string;
  }) => (
    <div>
      <label>{label}</label>
      <select aria-label={label} defaultValue={value || ""}>
        <option value="" disabled>
          {placeholder}
        </option>
        {items.map((item) => (
          <option key={item.value} value={item.value}>
            {item.label}
          </option>
        ))}
      </select>
    </div>
  ),
  FormRadioButton: ({
    label,
    options,
    value,
    isInvalid,
  }: {
    label: string;
    options: { value: string; label: string }[];
    value?: string;
    isInvalid?: boolean;
  }) => (
    <div>
      <label>{label}</label>
      {options.map((option) => (
        <div key={option.value}>
          <input
            type="radio"
            id={option.value}
            name={label}
            value={option.value}
            defaultChecked={value === option.value}
          />
          <label htmlFor={option.value}>{option.label}</label>
        </div>
      ))}
      {isInvalid && <span style={{ color: "red" }}>Selección inválida</span>}
    </div>
  ),
  PrimaryButton: ({ text }: { text: string }) => <button>{text}</button>,
  InfoModal: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe("CreateUserForm Component", () => {
  beforeEach(() => {
    (ViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  it("should call handleSubmit when form is submitted", () => {
    render(<CreateUserForm />);

    expect(screen.getByLabelText(/Nombres/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellidos/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Fecha de nacimiento/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Selecciona el genero del deportista/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Guardar/i)).toBeInTheDocument();
  });

  it("should display the InfoModal when modalVisible is true", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      ...mockViewModel,
      errorModal: true,
      errorMessage: "Test Message",
    });

    render(<CreateUserForm />);

    expect(screen.getByText("Test Message")).toBeInTheDocument();
  });

  it("should call handleSubmit on form submission", () => {
    const handleSubmitMock = jest.fn((e) => e.preventDefault());

    (ViewModel as jest.Mock).mockReturnValue({
      ...mockViewModel,
      handleSubmit: handleSubmitMock,
    });

    render(<CreateUserForm />);

    fireEvent.click(screen.getByText("Guardar"));

    expect(handleSubmitMock).toHaveBeenCalled();
  });

  it("should display error messages for invalid fields", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      ...mockViewModel,
      athleteDataError: {
        nameError: true,
        lastNameError: true,
        emailError: true,
        phoneNumberError: true,
        genreError: true,
        birthDateError: true,
      },
    });

    render(<CreateUserForm />);

    expect(
      screen.getByText("Por favor ingresa un nombre válido")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Por favor ingresa un apellido válido")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Por favor ingresa un correo electrónico válido")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Por favor ingresa una fecha válida")
    ).toBeInTheDocument();
    expect(screen.getByText("Selección inválida")).toBeInTheDocument();
  });

  it("should set the email field as read-only when athleteIdValue is defined", () => {
    (ViewModel as jest.Mock).mockReturnValue({
      ...mockViewModel,
      athleteIdValue: "123",
    });

    render(<CreateUserForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);

    expect(emailInput).toHaveAttribute("readOnly");
  });
});
