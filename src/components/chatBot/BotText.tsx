import React, { useState } from "react";
import { Constants, TextVariant } from "../../constants/appConstants";
import Icon, { IconNames } from "../global/appIcons/Icon";
import Typography from "../global/typography/Typography";
import { IBotText, IBotTextListItem } from "../../types/chatbot";
import Typing from "./Typing";

const BotText = ({ text }: IBotText) => {
  const [selectedReference, setSelectedReference] = useState<{
    item: IBotTextListItem;
    index: number;
  } | null>(null);
  console.log("text", text?.isLoading);

  const onReferenceClick = (item: IBotTextListItem, index: number) => {
    setSelectedReference({ item, index });
  };

  return (
    <div className="flex gap-3">
      <div className="mt-3">
        <Icon iconName={IconNames.chatLogo} iconSize={35} />
      </div>
      {text?.isLoading && (
        <div className="flex align-items-center ">
          <Typing />
        </div>
      )}
      {text?.isError && (
        <div className=" flex align-items-center">
          <div
            className="border-1 px-1  border-round-md w-12rem h-2rem flex align-items-center"
            style={{
              background: "#feedee",
              borderColor: "#f47a7b",
              color: "#9d9898",
            }}
          >
            <Typography variant={TextVariant.BODY2}>
              Something went wrong
            </Typography>
          </div>
        </div>
      )}
      <div className="flex flex-column w-9">
        <Typography variant={TextVariant.BODY2}>{text.heading}</Typography>
        {/* <ul className="list-decimal text-sm padding-inline-0 flex flex-column gap-2">
          {text?.list?.map((item: IBotTextListItem, index: number) => {
            return <li key={index}>{item.excerpt}</li>;
          })}
        </ul> */}
        <div className="flex align-items-center gap-2">
          {!!text?.list?.length && (
            <Typography variant={TextVariant.SUBHEADING2} className="my-1">
              {Constants.REFERENCES}
            </Typography>
          )}
          {text?.list?.map((item: IBotTextListItem, index: number) => {
            return (
              <div
                key={index}
                className={`flex px-3 py-1 border-1 border-primary border-round-3xl cursor-pointer ${
                  selectedReference?.index === index ? "bg-primary" : ""
                }`}
                onClick={() => onReferenceClick(item, index)}
              >
                <Typography variant={TextVariant.SUBHEADING4} className="m-0">
                  {index + 1}
                </Typography>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default BotText;
