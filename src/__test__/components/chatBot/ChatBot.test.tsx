import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { IChatBot } from "../../../types/chatbot";
import { ChatSenders } from "../../../constants/appConstants";


// Mock child components
jest.mock("./BotText", () => (props: any) => (
  <div data-testid="mock-bottext">BotText: {JSON.stringify(props.text)}</div>
));

jest.mock("./UserText", () => (props: any) => (
  <div data-testid="mock-usertext">UserText: {JSON.stringify(props.text)}</div>
));

jest.mock("../global/appInput/AppInput", () => ({
  AppInput: (props: any) => (
    <input
      data-testid="mock-appinput"
      placeholder={props.placeholder}
      value={props.value}
      onChange={props.onChange}
      onKeyDown={props.onKeyDown}
    />
  ),
}));

jest.mock("primereact/button", () => ({
  Button: ({ label, onClick, disabled }: any) => (
    <button onClick={onClick} disabled={disabled}>
      {label}
    </button>
  ),
}));

describe("ChatBot Component", () => {
  const mockOnChatInputChange = jest.fn();
  const mockOnChatKeyDown = jest.fn();
  const mockHandleSendChat = jest.fn();
  const mockHandlePastTopic = jest.fn();
  const mockHandleNewTopic = jest.fn();
  const mockHandleReference = jest.fn();

  const defaultProps: IChatBot = {
    conversation: {
      messages: [
        { sender: ChatSenders.USER, text: { answer: "User Message" } },
        { sender: ChatSenders.BOT, text: { answer: "Bot Response", isLoading: false } },
      ],
      createdAt: "2024-06-20T10:00:00Z",
    },
    chatValue: "Hello",
    selectedReference: null,
    onChatInputChange: mockOnChatInputChange,
    onChatKeyDown: mockOnChatKeyDown,
    handlePastTopic: mockHandlePastTopic,
    handleNewTopic: mockHandleNewTopic,
    handleSendChat: mockHandleSendChat,
    handleReference: mockHandleReference,
  };

  it("renders header with formatted date", () => {
    render(<ChatBot {...defaultProps} />);

    expect(screen.getByText("20 Jun 2024")).toBeInTheDocument();
    expect(screen.getByText(Constants.PAST_TOPICS)).toBeInTheDocument();
    expect(screen.getByText(Constants.NEW_TOPIC)).toBeInTheDocument();
  });

  it("renders user and bot messages", () => {
    render(<ChatBot {...defaultProps} />);

    expect(screen.getByTestId("mock-usertext")).toHaveTextContent("User Message");
    expect(screen.getByTestId("mock-bottext")).toHaveTextContent("Bot Response");
  });

  it("calls handlePastTopic when 'Past Topics' button is clicked", () => {
    render(<ChatBot {...defaultProps} />);
    const pastTopicsButton = screen.getByText(Constants.PAST_TOPICS);

    fireEvent.click(pastTopicsButton);

    expect(mockHandlePastTopic).toHaveBeenCalledTimes(1);
  });

  it("calls handleNewTopic when 'New Topic' button is clicked", () => {
    render(<ChatBot {...defaultProps} />);
    const newTopicButton = screen.getByText(Constants.NEW_TOPIC);

    fireEvent.click(newTopicButton);

    expect(mockHandleNewTopic).toHaveBeenCalledTimes(1);
  });

  it("disables 'New Topic' button when there are no messages", () => {
    const propsWithNoMessages = {
      ...defaultProps,
      conversation: { messages: [] },
    };

    render(<ChatBot {...propsWithNoMessages} />);
    const newTopicButton = screen.getByText(Constants.NEW_TOPIC);

    expect(newTopicButton).toBeDisabled();
  });

  it("calls onChatInputChange when input value changes", () => {
    render(<ChatBot {...defaultProps} />);
    const input = screen.getByTestId("mock-appinput");

    fireEvent.change(input, { target: { value: "New input" } });

    expect(mockOnChatInputChange).toHaveBeenCalledTimes(1);
  });

  it("calls onChatKeyDown when key is pressed in input", () => {
    render(<ChatBot {...defaultProps} />);
    const input = screen.getByTestId("mock-appinput");

    fireEvent.keyDown(input, { key: "Enter" });

    expect(mockOnChatKeyDown).toHaveBeenCalledTimes(1);
  });
});
