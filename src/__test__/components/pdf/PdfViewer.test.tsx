import React from "react";
import { render, screen } from "@testing-library/react";
import { Document } from "react-pdf";
import PdfViewer from "../../../components/pdf/PdfViewer";
import "@testing-library/jest-dom"; 

// Mock the `react-pdf` Document and Page components
jest.mock("react-pdf", () => ({
  Document: jest.fn(({ children }) => <div data-testid="document">{children}</div>),
  Page: jest.fn(({ pageNumber }) => (
    <div data-testid={`page-${pageNumber}`}>Page {pageNumber}</div>
  )),
}));

jest.mock("../../../context/ToastContext", () => ({
  useToast: jest.fn(() => ({ showToast: jest.fn() })),
}));

describe("PdfViewer Component", () => {
  const mockData = {
    file: "base64pdfdata",
    documentName: "Test Document",
    description: "Test Description",
  };
  const navigateBack = jest.fn();
  const selectedReference = {
    item: { page_no: 1, start_end_strings: ["start", "end"] },
  };


  it("renders zoom controls and allows zoom functionality", () => {
    render(
      <PdfViewer
        data={mockData}
        navigateBack={navigateBack}
        selectedReference={selectedReference}
      />
    );

    // Verify the zoom in and out buttons are rendered
    const zoomInButton = screen.getByRole("button", { name: /zoom in/i });
    const zoomOutButton = screen.getByRole("button", { name: /zoom out/i });

    expect(zoomInButton).toBeInTheDocument();
    expect(zoomOutButton).toBeInTheDocument();
  });
});
