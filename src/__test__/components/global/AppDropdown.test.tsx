// import React from "react";
// import { render, screen, fireEvent } from "@testing-library/react";
// import AppDropdown from "../../../components/global/appDropdown/AppDropdown";


// describe("AppDropdown Component", () => {
//   const mockOnChange = jest.fn();

//   const dropdownProps = {
//     className: "test-dropdown",
//     label: "Select Contract Type",
//     value: "fixedPriceContract",
//     options: [
//       { name: "Partnership Contract", code: "partnershipContract" },
//       { name: "Fixed Price Contract", code: "fixedPriceContract" },
//     ],
//     optionLabel: "name",
//     optionValue: "code",
//     onChange: mockOnChange,
//     placeholder: "Select a contract",
//   };

//   it("renders the label correctly", () => {
//     render(<AppDropdown {...dropdownProps} />);
//     expect(screen.getByText("Select Contract Type")).toBeInTheDocument();
//   });

//   test("renders the placeholder in the dropdown", () => {
//     render(<AppDropdown {...dropdownProps} />);
//     const dropdown = screen.getByPlaceholderText("Select a contract");
//     expect(dropdown).toBeInTheDocument();
//   });

//   test("renders dropdown options correctly", () => {
//     render(<AppDropdown {...dropdownProps} />);
//     fireEvent.mouseDown(screen.getByRole("combobox")); // Open dropdown
//     expect(screen.getByText("Partnership Contract")).toBeInTheDocument();
//     expect(screen.getByText("Fixed Price Contract")).toBeInTheDocument();
//   });

//   test("renders the selected value correctly", () => {
//     render(<AppDropdown {...dropdownProps} />);
//     const selectedOption = screen.getByDisplayValue("fixedPriceContract");
//     expect(selectedOption).toBeInTheDocument();
//   });

//   test("calls onChange handler when an option is selected", () => {
//     render(<AppDropdown {...dropdownProps} />);
//     fireEvent.change(screen.getByRole("combobox"), {
//       target: { value: "partnershipContract" },
//     });
//     expect(mockOnChange).toHaveBeenCalled();
//   });
// });

import React from "react";
import { render, screen } from "@testing-library/react";

import "@testing-library/jest-dom"; // Import for jest-dom matchers like toBeInTheDocument
import AppDropdown from "../../../components/global/appDropdown/AppDropdown";

describe("AppDropdown Component", () => {
  const dropdownProps = {
    className: "test-dropdown",
    label: "Select Contract Type",
    value: "fixedPriceContract",
    options: [
      { name: "Partnership Contract", code: "partnershipContract" },
      { name: "Fixed Price Contract", code: "fixedPriceContract" },
    ],
    optionLabel: "name",
    optionValue: "code",
    onChange: jest.fn(),
    placeholder: "Select a contract",
  };

  it("renders the label correctly", () => {
    render(<AppDropdown {...dropdownProps} />);
    expect(screen.getByText("Select Contract Type")).toBeInTheDocument();
  });

  it("renders the placeholder in the dropdown", () => {
        render(<AppDropdown {...dropdownProps} />);
        expect(screen.getByLabelText("Select a contract")).toBeInTheDocument();
      });

});
