import React from "react";
import Typography from "../typography/Typography";
import { IUserText } from "../types/chatbot";

const UserText = ({ text }: IUserText) => {
  return (
    <div className="flex align-self-end justify-content-end w-10">
      <div className="bg-primary px-3 flex border-round-3xl word-break-all">
        <Typography variant="p2">{text}</Typography>
      </div>
    </div>
  );
};

export default UserText;
