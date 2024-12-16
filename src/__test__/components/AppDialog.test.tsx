import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";

import '@testing-library/jest-dom';
import { AppDialog } from "../../components/global/appDialog/AppDialog";
 // Update with your actual file path

describe("AppDialog Component", () => {
  const mockSetVisible = jest.fn();
  const defaultProps = {
    visible: true,
    headerName: "Test Header",
    setVisible: mockSetVisible,
    children: <p>Dialog Content</p>,
    headerClassName: "custom-header-class",
    contentClassName: "custom-content-class",
    width: "60vw",
  };

  it("should render the dialog with the correct header and content", () => {
    render(<AppDialog {...defaultProps} />);

    // Check if header is rendered correctly
    expect(screen.getByText("Test Header")).toBeInTheDocument();

    // Check if children are rendered
    expect(screen.getByText("Dialog Content")).toBeInTheDocument();
  });
 
});
