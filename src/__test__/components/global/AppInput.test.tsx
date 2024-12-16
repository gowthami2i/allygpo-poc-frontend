import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import { AppInput } from "../../../components/global/appInput/AppInput";
import "@testing-library/jest-dom"; 

describe("AppInput Component", () => {
    const inputProps = {
        className: "test-dropdown",
        label: "Test Label",
        value: "",
        onChange: jest.fn(),
        placeholder: "Select a contract",
      };
    
  it("should render the label", () => {
    render(<AppInput {...inputProps}/>);
    expect(screen.getByText("Test Label")).toBeInTheDocument();
  });

  it("should call onChange when text is entered", () => {
    const onChangeMock = jest.fn();
    render(<AppInput value="" onChange={onChangeMock} />);
    const input = screen.getByRole("textbox");
    fireEvent.change(input, { target: { value: "Hello" } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
  });

  it("should disable input when isLoading is true", () => {
    render(<AppInput value="" onChange={() => {}} isLoading />);
    const input = screen.getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("should call onKeyDown when a key is pressed", () => {
    const onKeyDownMock = jest.fn();
    render(<AppInput value="" onChange={() => {}} onKeyDown={onKeyDownMock} />);
    const input = screen.getByRole("textbox");
    fireEvent.keyDown(input, { key: "Enter", code: "Enter", charCode: 13 });
    expect(onKeyDownMock).toHaveBeenCalledTimes(1);
  });

  it("should render placeholder text", () => {
    render(
      <AppInput
        value=""
        onChange={() => {}}
        placeholder="Enter your text here"
      />
    );
    const input = screen.getByPlaceholderText("Enter your text here");
    expect(input).toBeInTheDocument();
  });
});
