import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import Typing from "../../../components/chatBot/Typing";


describe("Typing Component", () => {
  it("should render the Typing component with three dots", () => {
    // Render the Typing component
    render(<Typing />);

    // Assert that the Typing component is present in the document
    const typingIndicator = screen.getByRole("region", { name: "typing-indicator" });
    expect(typingIndicator).toBeInTheDocument();

    // Assert that the component contains three dots
    const dots = screen.getAllByText(".");
    expect(dots.length).toBe(3);

    // Assert that each dot has the correct class
    dots.forEach(dot => {
      expect(dot).toHaveClass("dot");
    });
  });
});

