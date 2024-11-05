import React, { useEffect, useRef } from "react";
import { AppInput } from "../global/appInput/AppInput";
import BotText from "./BotText";
import UserText from "./UserText";
import { formatDate } from "../../utils/helpers";
import { IChatBot, IMessage } from "../../types/chatbot";
import {
  ChatSenders,
  Constants,
  DateFormats,
  TextVariant,
} from "../../constants/appConstants";
import { Button } from "primereact/button";
import Typography from "../global/typography/Typography";

const ChatBot = (props: IChatBot) => {
  const {
    conversation,
    chatValue,
    onChatInputChange,
    onChatKeyDown,
    handlePastTopic,
    handleSendChat,
    handleNewTopic,
  } = props;

  const chatContentRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  const isLoading = conversation?.messages?.map((msg) => msg.text.isLoading)[1];
  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  return (
    <div className="flex flex-column w-4">
      {/*chat bot */}
      <div className="chat">
        <div
          className={`flex flex-initial justify-content-between align-items-center py-2 px-3 border-bottom-1 border-gray-300
            ${!conversation.createdAt ? "" : "bg-past-topic"}
            `}
        >
          <Typography variant={TextVariant.HEADING3}>
            {!conversation.createdAt
              ? "New Topic"
              : formatDate(conversation.createdAt, DateFormats.DD_MMM_YYYY)}
          </Typography>
          <div className="flex gap-2">
            <Button
              label={Constants.PAST_TOPICS}
              type={"button"}
              onClick={handlePastTopic}
              severity="secondary"
              outlined
            />
            <Button
              label={Constants.NEW_TOPIC}
              type={"button"}
              onClick={handleNewTopic}
              disabled={conversation.messages?.length == 0}
              className="px-3"
            />
          </div>
        </div>
        {/*content */}
        <div className="chat-content" ref={chatContentRef}>
          <div className="flex flex-column p-3 gap-3 justify-content-end">
            {conversation?.messages?.map((con: IMessage, index: number) => {
              if (con.sender === ChatSenders.USER) {
                return (
                  <>
                    <UserText text={con.text} key={index} />
                  </>
                );
              } else {
                return <BotText text={con.text} key={index} />;
              }
            })}
          </div>
        </div>
      </div>
      {/*footer */}
      <div className="bg-primary w-4 px-3 pb-2 chat-footer">
        <AppInput
          placeholder="Ask a Question"
          onChange={onChatInputChange}
          value={chatValue}
          onKeyDown={onChatKeyDown}
          icon="pi pi-send"
          iconPosition="right"
          iconClick={handleSendChat}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default ChatBot;
