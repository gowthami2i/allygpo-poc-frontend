import react, { ChangeEvent, KeyboardEvent } from "react";

export interface IConversation {
  createdAt: string;
  messages: IMessage[];
}

export interface IChatBot {
  conversation: IConversation;
  chatValue: string;
  onChatKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChatInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendChat: () => void;
  handlePastTopic: () => void;
  handleNewTopic: () => void;
}

export interface IMessage {
  sender: string;
  text: IMessageText;
}

export interface IMessageText {
  heading: string;
  list: IBotTextListItem[];
}

export interface IUserText {
  text: IMessageText | string;
}

export interface IBotText {
  text: IMessageText;
}

export interface IBotTextListItem {
  document_id: string;
  page: number;
  excerpt: string;
}
