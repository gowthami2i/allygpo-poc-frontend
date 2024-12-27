import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BotText from "./../../../components/chatBot/BotText";
import { Constants, TextVariant } from "./../../../constants/appConstants";
import { IBotText, IBotTextListItem } from "./../../../types/chatbot";

// Mock dependencies
jest.mock("../global/appIcons/Icon", () => ({
  default: ({ iconName }: { iconName: string }) => (
    <div data-testid="mock-icon">{iconName}</div>
  ),
}));

jest.mock("../global/typography/Typography", () => {
  return ({ children, variant, className }: any) => (
    <div data-testid={`mock-typography-${variant}`} className={className}>
      {children}
    </div>
  );
});

jest.mock("./Typing", () => () => <div data-testid="mock-typing">Loading...</div>);

describe("BotText Component", () => {
  const mockHandleReference = jest.fn();

  const defaultProps = {
    text: {
      isLoading: false,
      isError: false,
      heading: "Bot Heading",
      answer: "This is a bot answer",
      list: [],
    },
    selectedReference: null,
    handleReference: mockHandleReference,
    conversationIndex: 0,
  };

  it("renders the bot icon and answer correctly", () => {
    render(<BotText {...defaultProps} />);
    expect(screen.getByTestId("mock-icon")).toHaveTextContent("chatLogo");
    expect(screen.getByTestId(`mock-typography-${TextVariant.BODY2}`)).toHaveTextContent(
      "This is a bot answer"
    );
  });

  it("shows loading indicator when isLoading is true", () => {
    const loadingProps = {
      ...defaultProps,
      text: { ...defaultProps.text, isLoading: true, heading: "Bot Heading" },
    };
    render(<BotText {...loadingProps} />);
    expect(screen.getByTestId("mock-typing")).toHaveTextContent("Loading...");
  });

  it("displays error message when isError is true", () => {
    const errorProps = {
      ...defaultProps,
      text: { ...defaultProps.text, isError: true, heading: "Bot Heading" },
    };
    render(<BotText {...errorProps} />);
    expect(screen.getByText("Something went wrong")).toBeInTheDocument();
  });

  it("renders references and handles click events correctly", () => {
    const references: IBotTextListItem[] = [
      { document_id: "123",
        page: 1,
        excerpt: "Reference 1"},
        { document_id: "345",
            page: 2,
            excerpt: "Reference 2"},
    ];

    const propsWithReferences = {
      ...defaultProps,
      text: { ...defaultProps.text, list: references, heading: "Bot Heading" },
    };

    render(<BotText {...propsWithReferences} />);

    // Check "References" text is displayed
    expect(
      screen.getByTestId(`mock-typography-${TextVariant.SUBHEADING2}`)
    ).toHaveTextContent(Constants.REFERENCES);

    // Check each reference is displayed
    references.forEach((_, index) => {
      const referenceElement = screen.getByText(`${index + 1}`);
      expect(referenceElement).toBeInTheDocument();

      // Simulate a click event
      fireEvent.click(referenceElement);
      expect(mockHandleReference).toHaveBeenCalledWith(
        references[index],
        `reference-${index}-${defaultProps.conversationIndex}`
      );
    });
  });

  it("applies 'bg-primary' class to the selected reference", () => {
    const references: IBotTextListItem[] = [
        { document_id: "123",
            page: 1,
            excerpt: "Reference 1"},
    ];

    const propsWithSelectedReference = {
      ...defaultProps,
      text: { ...defaultProps.text, list: references },
      selectedReference: { index: `reference-0-${defaultProps.conversationIndex}` },
    };

    render(<BotText {...propsWithSelectedReference} />);

    const referenceElement = screen.getByText("1");
    expect(referenceElement).toHaveClass("bg-primary");
  });
});
