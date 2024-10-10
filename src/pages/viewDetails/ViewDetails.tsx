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
import { useGetPastConversations } from "../../hook/chat/useGetChatConversation";
import { useGetChatConversation } from "../../hook/chat/useGetChatCitation";
import { ChatSenders, DialogHeader } from "../../constants/appConstants";

const ViewDetails = () => {
  const { navigateTo, navigateBack, location } = usePageNavigation();
  const { mutate } = usePostChatQuestion();
  const { data: chatConversations }: any = useGetPastConversations({
    userId: "1", // should get user id
    limit: 5,
    offset: 0,
  });
  const [citationRequest, setCitationRequest] = useState<any>(null);
  const { data: chatCitation } = useGetChatConversation(citationRequest);
  const [chat, setChat] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<IMessage[] | []>([]);
  const [visible, setVisible] = useState(false);
  const [createdAt, setCreatedAt] = useState<string>("");
  const viewData: IData | any = location.state;

  const handleViewDetails = (cell: any) => {
    setChatHistory([]);
    setCitationRequest({
      topicId: cell.topicId,
      documentName: viewData.documentName,
    });
    chatCitation?.conversations.forEach((convo: any) => {
      appendMessage(convo);
    });
    setCreatedAt(cell.createdAt);
    setVisible(false);
  };

  const columns = getPastTopicsColumn(handleViewDetails);
  const table = useReactTable({
    data: chatConversations?.conversations ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (!viewData?.documentName) {
      navigateTo("/");
    }
  }, [viewData?.documentName]);

  const handleChatKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSendChat();
    }
  };

  const handleSendChat = () => {
    if (chat) {
      const userMessage = {
        sender: ChatSenders.USER,
        text: chat,
      };
      const typingMessage = {
        sender: ChatSenders.BOT,
        text: { isLoading: true },
      };

      setChatHistory((prevHistory: any) => [
        ...prevHistory,
        userMessage,
        typingMessage,
      ]);

      mutate(
        {
          question: chat,
          documentName: viewData.documentName,
          createdDate: new Date(),
          conversationId: "",
        },
        {
          onSuccess: ({ data }) => {
            setChat("");
            setChatHistory((prevHistory) => {
              const newHistory = [...prevHistory];
              newHistory.pop();
              newHistory.pop();
              return newHistory;
            });
            appendMessage(data);
          },

          onError: () => {
            setChat("");
            const errorMessage = {
              sender: ChatSenders.BOT,
              text: { isError: true },
            };
            setChatHistory((prevHistory: any) => {
              const newHistory = [...prevHistory];
              newHistory.pop();
              const chatData = [...newHistory, errorMessage];
              return chatData;
            });
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
      sender: ChatSenders.USER,
      text: !chatResponse?.question
        ? structuredClone(chat)
        : chatResponse.question,
    };
    const assistantMessage = {
      sender: ChatSenders.BOT,
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
        headerName={DialogHeader.PAST_TOPICS}
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
