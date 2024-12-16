import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { ColumnDef } from "@tanstack/react-table";
import "@testing-library/jest-dom"; 
import AppTable, { IData } from "../../../components/global/table/AppTable";

const mockColumns: ColumnDef<IData>[] = [
  {
    header: "Description",
    accessorFn: (row) => row.description,
  },
  {
    header: "Contract Type",
    accessorFn: (row) => row.contractType,
  },
  {
    header: "Data Uploaded",
    accessorFn: (row) => row.dateUploaded,
  },
  {
    header: "id",
    accessorFn: (row) => row.id
  },
];

const mockData: IData[] = [
  {
    id: 1,
    document: null,
    description: "TestDescription1",
    contractType: "Type A",
    dateUploaded: "2023-01-01",
  },
  {
    id: 2,
    document: null,
    description: "TestDescription2",
    contractType: "Type B",
    dateUploaded: "2023-01-02",
  },
];

const mockTable = {
  getHeaderGroups: jest.fn(() => [
    {
      id: "header-group-1",
      headers: mockColumns.map((col, idx) => ({
        column: { columnDef: col },
        id: `header-${idx}`,
        getContext: jest.fn(),
      })),
    },
  ]),
  getRowModel: jest.fn(() => ({
    rows: mockData.map((row, idx) => ({
      id: `row-${idx}`,
      getVisibleCells: jest.fn(() => [
        {
          column: { columnDef: mockColumns[0] },
          getContext: jest.fn(() => ({ row })),
        },
        {
          column: { columnDef: mockColumns[1] },
          getContext: jest.fn(() => ({ row })),
        },
      ]),
    })),
  })),
  setPageIndex: jest.fn(),
};

describe("AppTable", () => {
  it("renders table headers and data correctly", () => {
    render(<AppTable table={mockTable} data={mockData} columns={mockColumns} paginator={false} />);

    // Check table headers
    mockColumns.forEach((col:any) => {
      expect(screen.getByText(col.header)).toBeInTheDocument();
    });
  });

  it("renders a 'No Data' message when no data is provided", () => {
    render(<AppTable table={mockTable} data={[]} columns={mockColumns} paginator={false} />);
    expect(screen.getByText("No Data")).toBeInTheDocument();
  });

  it("handles pagination", () => {
    render(<AppTable table={mockTable} data={mockData} columns={mockColumns} paginator={true} pageCount={1} />);

    // Check if paginator is rendered
    expect(screen.getByTestId("paginator")).toBeInTheDocument();

    // Simulate page change
    fireEvent.click(screen.getByText("2"));
    expect(mockTable.setPageIndex).toHaveBeenCalledWith(1);
  });
});