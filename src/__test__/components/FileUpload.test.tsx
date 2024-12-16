import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { CustomFileUpload } from "../../components/fileUpload/FileUpload";
import { Constants } from "../../constants/appConstants";
import '@testing-library/jest-dom';

// Mocking child components
jest.mock("primereact/fileupload", () => ({
  FileUpload: ({ onSelect }: any) => (
    <button
      data-testid="file-upload"
      onClick={() =>
        onSelect({
          files: [{ name: "test-file.pdf" }],
        })
      }
    >
      Upload File
    </button>
  ),
}));

jest.mock("../../components/global/appInput/AppInput", () => ({
  Icon: ({ iconName }: any) => <span data-testid={`icon-${iconName}`} />,
}));

jest.mock("../../components/global/appInput/AppInput", () => ({
  AppInput: ({ value, placeholder }: any) => (
    <input data-testid="app-input" value={value} placeholder={placeholder} readOnly />
  ),
}));

describe("CustomFileUpload", () => {
  const uploadFileHandler = jest.fn();

  it("renders the FileUpload component initially", () => {
    render(<CustomFileUpload uploadFileHandler={uploadFileHandler} label="Upload File" />);

  expect(screen.getByTestId("app-input")).toHaveAttribute(
      "placeholder",
      Constants.PLACEHOLDER_FILE
    );
  });

  it("handles file selection and displays the file name", () => {
    render(<CustomFileUpload uploadFileHandler={uploadFileHandler} label="Upload File" />);

    const uploadButton = screen.getByTestId("file-upload");
    fireEvent?.click(uploadButton);

    expect(uploadFileHandler).toHaveBeenCalled();
    expect(screen.getByDisplayValue("test-file.pdf")).toBeInTheDocument();
    // expect(screen.getByTestId("icon-documentIcon")).toBeInTheDocument();
    // expect(screen.getByTestId("icon-tickIcon")).toBeInTheDocument();
  });

  it("resets the file name on trash icon click", () => {
    render(<CustomFileUpload uploadFileHandler={uploadFileHandler} label="Upload File" />);

    const uploadButton = screen.getByTestId("file-upload");
    fireEvent?.click(uploadButton);

    const trashIcon = screen.getByTestId("icon-trashIcon");
    fireEvent?.click(trashIcon);

    expect(screen.getByTestId("file-upload")).toBeInTheDocument(); // Back to initial state
    expect(screen.queryByDisplayValue("test-file.pdf")).not.toBeInTheDocument();
  });
});
