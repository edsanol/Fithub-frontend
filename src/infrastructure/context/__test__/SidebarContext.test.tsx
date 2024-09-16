import { fireEvent, render, renderHook, screen } from "@testing-library/react";
import { SidebarProvider, useSidebar } from "../SidebarContext";
import { act } from "react-dom/test-utils";

const TestComponent = () => {
  const { sidebarOpen, setSidebarOpen } = useSidebar();
  return (
    <div>
      <span data-testid="sidebar-status">
        {sidebarOpen ? "Open" : "Closed"}
      </span>
      <button onClick={() => setSidebarOpen(true)}>Open Sidebar</button>
    </div>
  );
};

describe("SidebarProvider", () => {
  it("should provide default value for sidebarOpen as false", () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const status = screen.getByTestId("sidebar-status");
    expect(status.textContent).toBe("Closed");
  });

  it("should update sidebarOpen when setSidebarOpen is called", async () => {
    render(
      <SidebarProvider>
        <TestComponent />
      </SidebarProvider>
    );

    const status = screen.getByTestId("sidebar-status");
    expect(status.textContent).toBe("Closed");

    await act(async () => {
      const button = screen.getByText("Open Sidebar");
      fireEvent.click(button);
    });

    expect(status.textContent).toBe("Open");
  });
});
