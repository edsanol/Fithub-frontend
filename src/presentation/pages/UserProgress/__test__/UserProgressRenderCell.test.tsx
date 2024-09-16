import { MeasurementsProgress } from "@/domain/entities/MeasurementsProgress";
import { render } from "@testing-library/react";
import { customRenderCell } from "../components/table-render-cell/RenderCell";

describe("customRenderCell", () => {
  test("returns a <p> element with correct classes and content when columnKey is in columnKeys", () => {
    const record: MeasurementsProgress = {
      measurementsProgressID: 1,
      idAthlete: 1,
      date: "2023-10-01",
      weight: 70,
      height: 175,
      gluteus: 90,
      biceps: 35,
      chest: 100,
      waist: 80,
      thigh: 60,
      calf: 40,
      shoulders: 110,
      forearm: 30,
    };

    const columnKey = "weight";

    const { container } = render(<>{customRenderCell(record, columnKey)}</>);

    const pElement = container.querySelector("p");

    expect(pElement).toBeInTheDocument();
    expect(pElement).toHaveClass("text-bold text-sm capitalize");
    expect(pElement).toHaveTextContent("70");
  });

  test("returns cellValue directly when columnKey is not in columnKeys", () => {
    const record: MeasurementsProgress = {
      measurementsProgressID: 1,
      idAthlete: 1,
      date: "2023-10-01",
      weight: 70,
      height: 175,
      gluteus: 90,
      biceps: 35,
      chest: 100,
      waist: 80,
      thigh: 60,
      calf: 40,
      shoulders: 110,
      forearm: 30,
    };

    const columnKey = "measurementsProgressID";

    const cell = customRenderCell(record, columnKey);

    expect(cell).toBe(1);
  });

  test("returns undefined when columnKey does not exist in record", () => {
    const record: MeasurementsProgress = {
      measurementsProgressID: 1,
      idAthlete: 1,
      date: "2023-10-01",
      weight: 70,
      height: 175,
      gluteus: 90,
      biceps: 35,
      chest: 100,
      waist: 80,
      thigh: 60,
      calf: 40,
      shoulders: 110,
      forearm: 30,
    };

    const columnKey = "nonExistentKey";

    const cell = customRenderCell(record, columnKey);

    expect(cell).toBeUndefined();
  });
});
