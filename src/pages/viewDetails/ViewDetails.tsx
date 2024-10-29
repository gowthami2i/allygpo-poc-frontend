import React, { KeyboardEvent } from "react";
import ChatBot from "../../components/chatBot/ChatBot";
import PdfViewer from "../../components/pdf/PdfViewer";
import { ChangeEvent, useEffect, useState } from "react";
import "../../components/viewDetails/viewDetails.scss";
import { usePageNavigation } from "../../hook/global/UsePageNavigation";
import { AppDialog } from "../../components/global/appDialog/AppDialog";
import AppTable, { IData } from "../../components/global/table/AppTable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { IMessage } from "../../types/chatbot";
import { getPastTopicsColumn } from "../../components/viewDetails/PastTopicsMeta";
import { usePostChatQuestion } from "../../hook/chat/useChatQuestion";
import { useGetChatConversation } from "../../hook/chat/useGetChatConversation";
import { useGetChatCitation } from "../../hook/chat/useGetChatCitation";

const ViewDetails = () => {
  const { navigateTo, navigateBack, location } = usePageNavigation();
  const { mutate } = usePostChatQuestion();
  const { data: chatConversations }: any = useGetChatConversation({
    user_id: "1", // should get user id
    limit: 5,
    offset: 0,
  });
  const [citationRequest, setCitationRequest] = useState<any>(null);
  const { data: chatCitation } = useGetChatCitation(citationRequest);
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
    <div className="flex container">
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
      <AppDialog
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
      </AppDialog>
    </div>
  );
};

export default ViewDetails;
