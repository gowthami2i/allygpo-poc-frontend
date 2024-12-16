import React from "react";
import { render, screen } from "@testing-library/react";
import AllyGpo_icon from "../../../assets/images/AllyIQ_Icon.png";
import { Header } from "../../../components/global/header/Header";
import "@testing-library/jest-dom"; 

describe("Header", () => {
  it("renders without errors", () => {
    render(<Header />);
    expect(screen.getByTestId("Contract Explorer")).toBeInTheDocument();
    // Add your assertions here
  });

  // Add more test cases here
});