import { fireEvent, render, screen } from "@testing-library/react";
import RedirectButton from "../components/RedirectButton";

describe("RedirectButton Component", () => {
  it("should render the button with the correct text", () => {
    render(
      <RedirectButton
        color="secondary"
        variant="bordered"
        label="Iniciar sesión"
        onClick={jest.fn()}
        customClass="text-[#9c34c2]"
      />
    );

    const buttonElement = screen.getByRole("button", {
      name: /Iniciar sesión/i,
    });
    expect(buttonElement).toBeInTheDocument();
  });

  it("should call onClick when the button is clicked", () => {
    const handleClick = jest.fn();

    render(
      <RedirectButton
        color="secondary"
        variant="bordered"
        label="Iniciar sesión"
        onClick={handleClick}
        customClass="text-[#9c34c2]"
      />
    );

    const buttonElement = screen.getByRole("button", {
      name: /Iniciar sesión/i,
    });

    fireEvent.click(buttonElement);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
