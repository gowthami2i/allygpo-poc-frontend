import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom"; 
import { ContractUpload } from "../../../components/contractExplorer/ContractUpload";
import { Constants } from "../../../constants/appConstants";

// Mock dependencies
jest.mock("../../context/ToastContext", () => ({
  useToast: jest.fn(() => ({
    showToast: jest.fn(),
    clearToast: jest.fn(),
  })),
}));

jest.mock("../../hook/global/useLocalStorage", () => ({
  default: jest.fn(() => ({
    getItem: jest.fn(() => []),
    setItem: jest.fn(),
  })),
}));

jest.mock("../../store/appStore", () => ({
  ACTION_TYPE: { EXPLORER: "EXPLORER" },
  updateState: jest.fn(),
}));

jest.mock("../../utils/helpers", () => ({
  blobToBase64: jest.fn(() => Promise.resolve("base64-file")),
}));

const mockProps = {
  setVisible: jest.fn(),
  uploadDocument: jest.fn(),
  isUploadPending: false,
  isUploadSuccess: false,
};

describe("ContractUpload Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the ContractUpload component correctly", () => {
    render(<ContractUpload {...mockProps} />);

    // Check if input fields, dropdown, and buttons are rendered
    expect(screen.getByLabelText(Constants.SELECT_FILE)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(Constants.PLACEHOLDER_DESCRIPTION_REQUIRED)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(Constants.PLACEHOLDER_CONTRACT_TYPE_REQUIRED)).toBeInTheDocument();
    expect(screen.getByText(Constants.CANCEL)).toBeInTheDocument();
    expect(screen.getByText(Constants.UPLOAD)).toBeInTheDocument();
  });

  it("validates form inputs and displays error messages", async () => {
    render(<ContractUpload {...mockProps} />);

    const uploadButton = screen.getByText(Constants.UPLOAD);

    // Submit the form with empty fields
    fireEvent.click(uploadButton);

    await waitFor(() => {
      // Check if validation error messages are displayed
      expect(screen.getByText(Constants.FILE_REQUIRED)).toBeInTheDocument();
      expect(screen.getByText(Constants.DESCRIPTION_REQUIRED)).toBeInTheDocument();
      expect(screen.getByText(Constants.CONTRACT_TYPE_REQUIRED)).toBeInTheDocument();
    });
  });

  it("handles file upload and updates the field value", () => {
    render(<ContractUpload {...mockProps} />);

    const fileInput = screen.getByLabelText(Constants.SELECT_FILE) as HTMLInputElement;
    const file = new File(["dummy content"], "test-file.pdf", { type: "application/pdf" });

    // Simulate file upload
    fireEvent.change(fileInput, { target: { files: [file] } });

    expect(fileInput.files?.[0]).toBe(file);
  });

  it("calls setVisible and displays a toast when upload is pending", () => {
    const pendingProps = { ...mockProps, isUploadPending: true };
    const { useToast } = require("../../context/ToastContext");
    const { showToast } = useToast();

    render(<ContractUpload {...pendingProps} />);

    expect(mockProps.setVisible).toHaveBeenCalledWith(false);
    expect(showToast).toHaveBeenCalledWith({
      severity: "info",
      detail: "Please wait, Uploading in progress...",
      sticky: true,
      closable: false,
    });
  });

  it("submits the form and handles success flow", async () => {
    const { useToast } = require("../../context/ToastContext");
    const { showToast, clearToast } = useToast();
    const { blobToBase64 } = require("../../utils/helpers");
    const { updateState } = require("../../store/appStore");

    const mockUploadDocument = jest.fn((_, { onSuccess }) => onSuccess());
    const successProps = { ...mockProps, uploadDocument: mockUploadDocument };

    render(<ContractUpload {...successProps} />);

    // Fill form fields
    const fileInput = screen.getByLabelText(Constants.SELECT_FILE);
    const file = new File(["dummy content"], "test-file.pdf", { type: "application/pdf" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const descriptionInput = screen.getByPlaceholderText(Constants.PLACEHOLDER_DESCRIPTION_REQUIRED);
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });

    const contractTypeDropdown = screen.getByPlaceholderText(Constants.PLACEHOLDER_CONTRACT_TYPE_REQUIRED);
    fireEvent.change(contractTypeDropdown, { target: { value: "ContractType1" } });

    const uploadButton = screen.getByText(Constants.UPLOAD);
    fireEvent.click(uploadButton);

    await waitFor(() => {
      // Check if toast and local storage updates are called
      expect(clearToast).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith({
        severity: "success",
        detail: "Uploaded successfully",
        sticky: true,
      });
      expect(blobToBase64).toHaveBeenCalledWith(file);
      expect(updateState).toHaveBeenCalledWith("EXPLORER", expect.any(Array));
    });
  });

  it("handles error flow on upload failure", async () => {
    const { useToast } = require("../../context/ToastContext");
    const { showToast, clearToast } = useToast();

    const mockUploadDocument = jest.fn((_, { onError }) => onError());
    const errorProps = { ...mockProps, uploadDocument: mockUploadDocument };

    render(<ContractUpload {...errorProps} />);

    // Fill form fields
    const fileInput = screen.getByLabelText(Constants.SELECT_FILE);
    const file = new File(["dummy content"], "test-file.pdf", { type: "application/pdf" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    const descriptionInput = screen.getByPlaceholderText(Constants.PLACEHOLDER_DESCRIPTION_REQUIRED);
    fireEvent.change(descriptionInput, { target: { value: "Test Description" } });

    const contractTypeDropdown = screen.getByPlaceholderText(Constants.PLACEHOLDER_CONTRACT_TYPE_REQUIRED);
    fireEvent.change(contractTypeDropdown, { target: { value: "ContractType1" } });

    const uploadButton = screen.getByText(Constants.UPLOAD);
    fireEvent.click(uploadButton);

    await waitFor(() => {
      // Check if error toast is displayed
      expect(clearToast).toHaveBeenCalled();
      expect(showToast).toHaveBeenCalledWith({
        severity: "error",
        detail: "Upload Failed",
        sticky: true,
      });
    });
  });
});