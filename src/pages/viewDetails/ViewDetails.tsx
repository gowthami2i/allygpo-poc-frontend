import React, { KeyboardEvent } from "react";
import ChatBot from "../../chatBot/ChatBot";
import PdfViewer from "../../pdf/PdfViewer";
import { ChangeEvent, useEffect, useState } from "react";
import { useHeader } from "../../hook/useHeader";
import {
  useGetChatCitation,
  useGetChatConversation,
  usePostChatQuestion,
} from "../../hook/service/chatbot/ChatBotService";
import "./viewDetails.scss";
import { usePageNavigation } from "../../hook/UsePageNavigation";
import { IData } from "../../types/components/appTable";
import { CustomDialog } from "../../components/customDialog/CustomDialog";
import AppTable from "../../components/table/AppTable";
import { getPastTopicsColumn } from "./PastTopicsMeta";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IMessage } from "../../types/chatbot";

const ViewDetails = () => {
  const { header } = useHeader();
  const { navigateTo, navigateBack, location } = usePageNavigation();
  const { mutate } = usePostChatQuestion();
  const { data: chatConversations }: any = useGetChatConversation({
    user_id: "1", // should get user id
    limit: 5,
    offset: 0,
  });
  const [citationRequest, setCitationRequest] = useState<any>(null);
  const { data: chatCitation } = useGetChatCitation(citationRequest);
  const [height, setHeight] = useState(0);
  const [chat, setChat] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IMessage[] | []>([]);
  const [visible, setVisible] = useState(false);
  const [createdAt, setCreatedAt] = useState<string>("");
  const viewData: IData | any = location.state;

  const handleViewDetails = (cell: any) => {
    setChatHistory([]);
    setCitationRequest({
      conversation_id: cell.conversation_id,
      question: cell.summary,
    });
    appendMessage(chatCitation);
    setCreatedAt(cell.created_at);
    setVisible(false);
  };

  const columns = getPastTopicsColumn(handleViewDetails);
  const table = useReactTable({
    data: chatConversations?.conversations ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    const maxDataHeight = () => {
      setHeight(window.innerHeight - header?.offsetHeight);
    };

    maxDataHeight();
    window.addEventListener("resize", maxDataHeight);

    return () => window.removeEventListener("resize", maxDataHeight);
  }, [header?.offsetHeight]);

  useEffect(() => {
    if (!viewData?.document) {
      navigateTo("/");
    }
  }, [viewData?.document]);

  const handleChatKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendChat();
    }
  };

  const handleSendChat = () => {
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
  };

  const handleChatInputChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setChat(e.target.value);
  };

  const appendMessage = (chatResponse: any) => {
    const userMessage = {
      sender: "user",
      text: !chatResponse?.question
        ? structuredClone(chat)
        : chatResponse.question,
    };

    const assistantMessage = {
      sender: "assistant",
      text: {
        heading: chatResponse?.answer || "",
        list: chatResponse?.citations || [],
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
      <PdfViewer data={viewData} navigateBack={navigateBack} />
      <ChatBot
        conversation={{ createdAt, messages: chatHistory }}
        onChatKeyDown={handleChatKeyDown}
        handleSendChat={handleSendChat}
        onChatInputChange={handleChatInputChange}
        chatValue={chat}
        handlePastTopic={() => {
          setVisible(true);
        }}
        handleNewTopic={() => {
          setChatHistory([]);
          setCreatedAt("");
        }}
      />
      <CustomDialog
        visible={visible}
        headerName={"Past Topics"}
        setVisible={setVisible}
        headerClassName="p-2"
        contentClassName="p-0 dialog-content"
        width="65vw"
      >
        <AppTable
          columns={columns}
          data={chatConversations?.conversations}
          table={table}
          paginator={false}
        />
      </CustomDialog>
    </div>
  );
};

export default ViewDetails;
