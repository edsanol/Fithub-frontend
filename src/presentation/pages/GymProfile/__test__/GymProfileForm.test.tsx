import { fireEvent, render, screen } from "@testing-library/react";
import ViewModel from "../gym-profile-form/ViewModel";
import GymProfileForm from "../gym-profile-form/GymProfileForm";

jest.mock("../gym-profile-form/ViewModel");

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
  FormTextarea: ({
    label,
    value,
    placeholder,
    onChange,
  }: {
    label: string;
    value: string;
    placeholder: string;
    onChange: (value: string) => void;
  }) => (
    <div>
      <label>{label}</label>
      <textarea
        aria-label={label}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  ),
  FormLink: ({ text, onClick }: { text: string; onClick: () => void }) => (
    <button onClick={onClick}>{text}</button>
  ),
  PrimaryButton: ({ text }: { text: string }) => <button>{text}</button>,
  InfoModal: ({ message }: { message: string }) => <div>{message}</div>,
}));

describe("GymProfileForm", () => {
  const mockViewModel = {
    handleSubmit: jest.fn(),
    setField: jest.fn(),
    handleClick: jest.fn(),
    setErrorModal: jest.fn(),
    isClicked: false,
    gymUserData: {
      gymName: "Test Gym",
      address: "123 Test St",
      nit: "123456789",
      phoneNumber: "1234567890",
      email: "test@gym.com",
      subscriptionPlan: "Basic",
      comments: "No comments",
    },
    gymUserDataError: {},
    errorMessage: "",
    errorModal: false,
  };

  beforeEach(() => {
    (ViewModel as jest.Mock).mockReturnValue(mockViewModel);
  });

  it("renders GymProfileForm correctly", () => {
    render(<GymProfileForm />);
    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Dirección/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/NIT o razón social/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Número de teléfono/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Membresías/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Comentarios adicionales/i)
    ).toBeInTheDocument();
  });

  it("should toggle edit mode when edit button is clicked", () => {
    render(<GymProfileForm />);

    const editButton = screen.getByRole("button", { name: /Editar/i });
    fireEvent.click(editButton);

    expect(mockViewModel.handleClick).toHaveBeenCalled();
    expect(editButton.textContent).toBe("Editar");
  });

  it("should display error modal when there is an error", () => {
    mockViewModel.errorModal = true;
    mockViewModel.errorMessage = "Error message test";

    render(<GymProfileForm />);

    const errorModal = screen.getByText(/Error message test/i);
    expect(errorModal).toBeInTheDocument();
  });

  it("should call handleSubmit when form is submitted", () => {
    render(<GymProfileForm />);

    const form = screen.getByTestId("gym-profile-form-id");
    fireEvent.submit(form);

    expect(mockViewModel.handleSubmit).toHaveBeenCalled();
  });

  it("should display validation errors for invalid fields", () => {
    mockViewModel.gymUserDataError = {
      gymNameError: true,
      addressError: true,
    };

    render(<GymProfileForm />);

    expect(
      screen.getByText(/Por favor ingresa un nombre válido/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Por favor ingresa una dirección válida/i)
    ).toBeInTheDocument();
  });
});
