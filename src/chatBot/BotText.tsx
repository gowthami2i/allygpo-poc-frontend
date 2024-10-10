import { useState } from "react";
import chatIcon from "../assets/images/svg/chat_logo.svg";
import Typography from "../typography/Typography";

const BotText = ({ text }: any) => {
  const [selectedReference, setSelectedReference] = useState<{
    item: any;
    index: number;
  } | null>(null);
  // const [blocked, setBlocked] = useState<boolean>(true);

  const onReferenceClick = (item: any, index: number) => {
    setSelectedReference({ item, index });
  };

  return (
    <div className="flex gap-3">
      <div className="mt-3">
        <img src={chatIcon} alt="chat-logo" />
      </div>
      <div className="flex flex-column w-9">
        <Typography variant="h7">{text.heading}</Typography>
        <ul className="list-decimal text-sm padding-inline-0 flex flex-column gap-2">
          {text?.list?.map((item: any, index: number) => {
            return <li key={index}>{item.excerpt}</li>;
          })}
        </ul>
        <div className="flex align-items-center gap-2">
          <Typography variant="h7" className="my-1">
            References:
          </Typography>
          {text?.list?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`flex px-3 py-1 border-1 border-primary border-round-3xl cursor-pointer ${
                  selectedReference?.index === index ? "bg-primary" : ""
                }`}
                onClick={() => onReferenceClick(item, index)}
              >
                <Typography variant="p2" className="m-0">
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
