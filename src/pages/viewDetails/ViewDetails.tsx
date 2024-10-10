import React from "react";
import ChatBot from "../../chatBot/ChatBot";
import PdfViewer from "../../pdf/PdfViewer";
import pdf from "../../../src/assets/Bacuti.pdf";
import { ChangeEvent, useEffect, useState } from "react";
import { useHeader } from "../../hook/useHeader";
import { usePostChatQuestion } from "../../hook/service/chatbot/ChatBotService";
import "./viewDetails.scss";
import { usePageNavigation } from "../../hook/UsePageNavigation";
import { IData } from "../../types/components/appTable";

const ViewDetails = () => {
  const { header } = useHeader();
  const { navigateBack, location } = usePageNavigation();
  const { mutate } = usePostChatQuestion();
  const [height, setHeight] = useState(0);
  const [chat, setChat] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Array<any>>([]);
  const viewData: IData | any = location.state;

  useEffect(() => {
    const maxDataHeight = () => {
      setHeight(window.innerHeight - (header?.offsetHeight ?? 0));
    };

    maxDataHeight();
    window.addEventListener("resize", maxDataHeight);

    return () => window.removeEventListener("resize", maxDataHeight);
  }, [header?.offsetHeight]);

  const handleChatKeyDown = (e: any) => {
    if (e.key === "Enter") {
      if (chat) {
        mutate(
          { question: chat },
          {
            onSuccess: (data) => {
              setChat("");
              appendMessage(data);
            },
          }
        );
      }
    }
  };

  const handleChatInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
  };

  const appendMessage = (chatResponse: any) => {
    const userMessage = {
      sender: "user",
      text: structuredClone(chat), // User's message
    };

    const assistantMessage = {
      sender: "assistant",
      text: {
        heading: chatResponse?.answer || "No answer found",
        list: chatResponse?.citations || [], // Citations list
      },
    };

    setChatHistory((prevHistory) => [
      ...prevHistory,
      userMessage,
      assistantMessage,
    ]);
  };

  return (
    <div className="flex container" style={{ height: height }}>
      {/*<div className="flex-1"></div>*/}
      <PdfViewer data={viewData} navigateBack={navigateBack} />
      <ChatBot
        conversation={{ messages: chatHistory }}
        onChatKeyDown={handleChatKeyDown}
        onChatInputChange={handleChatInputChange}
        chatValue={chat}
      />
    </div>
  );
};

export default ViewDetails;
