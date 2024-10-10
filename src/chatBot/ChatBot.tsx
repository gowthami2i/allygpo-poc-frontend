import React from "react";
import { CustomButton } from "../components/customButton/CustomButton";
import Typography from "../typography/Typography";
import { CustomInput } from "../components/customInput/CustomInput";
import BotText from "./BotText";
import UserText from "./UserText";

interface conversation {
  conversation: any;
  onChatKeyDown: (event: any) => void;
  onChatInputChange: (event: any) => void;
  chatValue: string;
}

const ChatBot = (props: conversation) => {
  const { conversation, chatValue, onChatInputChange, onChatKeyDown } = props;

  const handlePastTopic = () => {};
  const handleNewTopic = () => {};

  return (
    <div className="flex flex-column w-4">
      {/*chat bot */}
      <div className="border-1 border-gray-300 chat">
        <div className="flex flex-initial justify-content-between align-items-center py-2 px-3 border-bottom-1 border-gray-300">
          <Typography variant="h7">New Topic</Typography>
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
            />
          </div>
        </div>
        {/*content */}
        <div className="overflow-scroll chat-content">
          <div className="flex flex-column p-3 gap-3 h-full justify-content-end">
            {conversation?.messages?.map((con: any, index: number) => {
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
      <div className="bg-primary px-3 pb-3">
        <CustomInput
          placeholder="Ask a Question"
          onChange={onChatInputChange}
          value={chatValue}
          onKeyDown={onChatKeyDown}
        />
      </div>
    </div>
  );
};

export default ChatBot;
