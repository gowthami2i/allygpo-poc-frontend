import React from "react";
import { IUserText } from "../../types/chatbot";
import { TextVariant } from "../../constants/appConstants";
import Typography from "../global/typography/Typography";

const UserText = ({ text }: IUserText) => {
  return (
    <div className="flex align-self-end justify-content-end w-10">
      <div className="bg-primary px-3 flex border-round-3xl word-break-all">
        <Typography variant={TextVariant.BODY2}>{text}</Typography>
      </div>
    </div>
  );
};

export default UserText;
