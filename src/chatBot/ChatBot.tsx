import React, { useEffect, useRef } from "react";
import { CustomButton } from "../components/customButton/CustomButton";
import Typography from "../typography/Typography";
import { CustomInput } from "../components/customInput/CustomInput";
import BotText from "./BotText";
import UserText from "./UserText";
import { formatDate } from "../utils/helpers";
import { DateFormats } from "../constants/constant";
import { IChatBot, IMessage } from "../types/chatbot";

const ChatBot = (props: IChatBot) => {
  const {
    conversation,
    chatValue,
    onChatInputChange,
    onChatKeyDown,
    handlePastTopic,
    handleNewTopic,
    handleSendChat,
  } = props;

  const chatContentRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    if (chatContentRef.current) {
      chatContentRef.current.scrollTop = chatContentRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [conversation.messages]);

  return (
    <div className="flex flex-column w-4">
      {/*chat bot */}
      <div className="chat">
        <div
          className={`flex flex-initial justify-content-between align-items-center py-2 px-3 border-bottom-1 border-gray-300
            ${conversation.createdAt === "" ? "" : "bg-past-topic"}
            `}
        >
          <Typography variant="h7">
            {conversation.createdAt === ""
              ? "New Topic"
              : formatDate(conversation.createdAt, DateFormats.DD_MMM_YYYY)}
          </Typography>
          <div className="flex gap-2">
            <CustomButton
              buttonType={"primary-outline"}
              label={"Past topics"}
              onClick={handlePastTopic}
            />
            <CustomButton
              buttonType={"primary"}
              label={"New topic"}
              onClick={handleNewTopic}
              disabled={conversation.messages?.length == 0}
            />
          </div>
        </div>
        {/*content */}
        <div className="chat-content" ref={chatContentRef}>
          <div className="flex flex-column p-3 gap-3 justify-content-end">
            {conversation?.messages?.map((con: IMessage, index: number) => {
              if (con.sender === "user") {
                return <UserText text={con.text} key={index} />;
              } else {
                return <BotText text={con.text} key={index} />;
              }
            })}
          </div>
        </div>
      </div>
      {/*footer */}
      <div className="bg-primary w-4 px-3 pb-2 chat-footer">
        <CustomInput
          placeholder="Ask a Question"
          onChange={onChatInputChange}
          value={chatValue}
          onKeyDown={onChatKeyDown}
          icon="pi pi-send"
          iconPosition="right"
          iconClick={handleSendChat}
        />
      </div>
    </div>
  );
};

export default ChatBot;
