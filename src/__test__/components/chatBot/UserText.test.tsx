import React from "react";
import { render, screen } from "@testing-library/react";
import UserText from "../../../components/chatBot/UserText";

describe("UserText Component", () => {
  it("should render the UserText component with the correct text", () => {
    // Mock text prop
    const mockText = "Hello, this is a test message";

    // Render the component
    render(<UserText text={mockText} />);

    // Assert that the Typography component is rendered with the correct text
    const typographyElement = screen.getByText(mockText);
    expect(typographyElement).toBeInTheDocument();

    // Assert that the Typography component uses the correct variant
    expect(typographyElement.closest("div")).toHaveClass("bg-primary");
  });

  it("should apply the correct classes to the container elements", () => {
    // Mock text prop
    const mockText = "Another test message";

    // Render the component
    render(<UserText text={mockText} />);

    // Assert that the outer div has the correct classes
    const outerDiv = screen.getByText(mockText).closest("div.flex");
    expect(outerDiv).toHaveClass("flex align-self-end justify-content-end w-10");

    // Assert that the inner div has the correct classes
    const innerDiv = screen.getByText(mockText).closest("div.bg-primary");
    expect(innerDiv).toHaveClass("bg-primary px-3 flex border-round-3xl word-break-all");
  });
});

