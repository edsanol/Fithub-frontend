import { Discounts } from "@/domain/entities/Discounts";
import { customRenderCell } from "../RenderCell";
import { fireEvent, render, screen } from "@testing-library/react";

jest.mock("@/assets/svg/EyeIcon", () => (props: any) => (
  <span data-testid="eye-icon" onClick={props.clickHandler}></span>
));
jest.mock("@/assets/svg/EditIcon", () => (props: any) => (
  <span data-testid="edit-icon" onClick={props.clickHandler}></span>
));
jest.mock("@/assets/svg/DeleteIcon", () => (props: any) => (
  <span data-testid="delete-icon" onClick={props.clickHandler}></span>
));

describe("customRenderCell", () => {
  const mockDiscount: Discounts = {
    discountId: 1,
    discountPercentage: 20,
    startDate: "2023-01-01",
    endDate: "2023-12-31",
    status: true,
    idMembership: 1,
    idGym: 1,
    comments: "This is a comment",
  };

  const mockHandleOpenModal = jest.fn();

  it("should render discount percentage", () => {
    const result = customRenderCell(mockDiscount, "discountPercentage", {
      handleOpenModal: mockHandleOpenModal,
    });
    render(result);

    expect(screen.getByText("20 %")).toBeInTheDocument();
  });

  it("should render start date correctly", () => {
    const result = customRenderCell(mockDiscount, "startDate", {
      handleOpenModal: mockHandleOpenModal,
    });
    render(result);

    expect(screen.getByText("2023-01-01")).toBeInTheDocument();
  });

  it("should render end date correctly", () => {
    const result = customRenderCell(mockDiscount, "endDate", {
      handleOpenModal: mockHandleOpenModal,
    });
    render(result);

    expect(screen.getByText("2023-12-31")).toBeInTheDocument();
  });

  it("should render status chip as 'Activo'", () => {
    const result = customRenderCell(mockDiscount, "status", {
      handleOpenModal: mockHandleOpenModal,
    });
    render(result);

    expect(screen.getByText("Activo")).toBeInTheDocument();
  });

  it("should render actions and handle modal opens", () => {
    const result = customRenderCell(mockDiscount, "actions", {
      handleOpenModal: mockHandleOpenModal,
    });
    render(result);

    const eyeIcon = screen.getByTestId("eye-icon");
    const editIcon = screen.getByTestId("edit-icon");
    const deleteIcon = screen.getByTestId("delete-icon");

    // Verify icons are rendered
    expect(eyeIcon).toBeInTheDocument();
    expect(editIcon).toBeInTheDocument();
    expect(deleteIcon).toBeInTheDocument();

    // Simulate clicking each icon
    fireEvent.click(eyeIcon);
    fireEvent.click(editIcon);
    fireEvent.click(deleteIcon);

    // Verify that the appropriate modal handlers are called
    expect(mockHandleOpenModal).toHaveBeenCalledWith("detailsModal", 1);
    expect(mockHandleOpenModal).toHaveBeenCalledWith("editModal", 1);
    expect(mockHandleOpenModal).toHaveBeenCalledWith("deleteModal", 1);
  });
});
