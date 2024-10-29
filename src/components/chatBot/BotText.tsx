import React, { useState } from "react";
import Typography from "../typography/Typography";
import { IBotText, IBotTextListItem } from "../../types/chatbot";
import { Constants, TextVariant } from "../../constants/appConstants";
import Icon, { IconNames } from "../global/appIcons/Icon";

const BotText = ({ text }: IBotText) => {
  const [selectedReference, setSelectedReference] = useState<{
    item: IBotTextListItem;
    index: number;
  } | null>(null);
  // const [blocked, setBlocked] = useState<boolean>(true);

  const onReferenceClick = (item: IBotTextListItem, index: number) => {
    setSelectedReference({ item, index });
  };

  return (
    <div className="flex gap-3">
      <div className="mt-3">
        <Icon iconName={IconNames.chatLogo} iconSize={35} />
      </div>

      <div className="flex flex-column w-9">
        <Typography variant={TextVariant.SUBHEADING2}>
          {text.heading}
        </Typography>
        <ul className="list-decimal text-sm padding-inline-0 flex flex-column gap-2">
          {text?.list?.map((item: IBotTextListItem, index: number) => {
            return <li key={index}>{item.excerpt}</li>;
          })}
        </ul>
        <div className="flex align-items-center gap-2">
          <Typography variant={TextVariant.SUBHEADING2} className="my-1">
            {Constants.REFERENCES}
          </Typography>
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
