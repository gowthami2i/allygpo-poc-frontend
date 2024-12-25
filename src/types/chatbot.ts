import { ChangeEvent, KeyboardEvent } from "react";

export interface IConversation {
  createdAt: string;
  messages: IMessage[];
}

export interface IChatBot {
  conversation: IConversation;
  chatValue: string;
  selectedReference: any;
  onChatKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onChatInputChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
  handleSendChat: () => void;
  handlePastTopic: () => void;
  handleNewTopic: () => void;
  handleReference: (item: IBotTextListItem, index: string | number) => void;
  isSender:boolean;
}

export interface IMessage {
  sender: string;
  text: IMessageText;
}

export interface IMessageText {
  heading: string;
  answer: string;
  list: IBotTextListItem[];
  isLoading?: boolean;
  isError?: boolean;
}

export interface IUserText {
  text: IMessageText | string;
}

export interface IBotText {
  text: IMessageText;
  handleReference: (item: IBotTextListItem, index: string | number) => void;
  selectedReference: any;
  conversationIndex: number;
}

export interface IBotTextListItem {
  document_id: string;
  page: number;
  excerpt: string;
}
