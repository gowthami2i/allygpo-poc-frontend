import React, { KeyboardEvent } from "react";
import ChatBot from "../../components/chatBot/ChatBot";
import { ChangeEvent, useEffect, useState } from "react";
import "../../components/viewDetails/viewDetails.scss";
import { usePageNavigation } from "../../hook/global/UsePageNavigation";
import { AppDialog } from "../../components/global/appDialog/AppDialog";
import AppTable, { IData } from "../../components/global/table/AppTable";
import { getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { getPastTopicsColumn } from "../../components/viewDetails/PastTopicsMeta";
import { usePostChatQuestion } from "../../hook/chat/useChatQuestion";
import { useGetPastConversations } from "../../hook/chat/useGetChatConversation";
import { useGetChatConversation } from "../../hook/chat/useGetChatCitation";
import { ChatSenders, DialogHeader } from "../../constants/appConstants";
import { IBotTextListItem } from "../../types/chatbot";
import PdfViewer from "../../components/pdf/PdfViewer";
import { useToast } from "../../context/ToastContext";
import { marked } from 'marked';

const ViewDetails = () => {
  const { navigateTo, navigateBack, location } = usePageNavigation();
  const { mutate } = usePostChatQuestion();
  const { mutate: chatConversations, data }: any = useGetPastConversations();
  const { mutate: chatCitation } = useGetChatConversation();
  const [chat, setChat] = useState<string>("");
  const [conversationId, setConversationId] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<any>([]);
  const [visible, setVisible] = useState(false);
  const [isSender, setIsSender] = useState(false);
  const [chatHistoryOptions, setChatHistoryOptions] = useState<any>({});
  const [selectedReference, setSelectedReference] = useState<{
    item: IBotTextListItem;
    index: string | number;
  } | null>(null);
  const viewData: IData | any = location.state;
  const { showToast }: any = useToast();

  const handleViewDetails = (cell: any) => {
    setChatHistoryOptions({
      createdAt: cell.createdAt,
      conversationId: cell.topicId,
    });
    chatCitation(
      { topicId: cell.topicId },
      {
        onSuccess: (data) => {
          setChatHistory([]);
          data?.data?.conversations?.forEach((convo: any) => {
            appendMessage(convo);
          });
          setVisible(false);
        },
        onError: () => {
          showToast({
            severity: "error",
            detail: "Failed to laod conversation",
            sticky: true,
          });
        },
      }
    );
    setSelectedReference(null);
  };

  const columns = getPastTopicsColumn(handleViewDetails);
  const table = useReactTable({
    data: data?.data ?? [],
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
      setIsSender(true);
      setChatHistory((prevHistory: any) => [
        ...prevHistory,
        userMessage,
        typingMessage,
      ]);

      mutate(
        {
          question: chat,
          documentName: viewData.documentName,
          topicId: conversationId,
          createdDate: new Date(),
          conversationId: "",
        },
        {
          onSuccess: ({ data }) => {
            setConversationId(data?.topicId);
            setChat("");
            setIsSender(false);
            setChatHistory((prevHistory: any) => {
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
    const isCitationError = typeof chatResponse?.citations === "string";
  
    const userMessage = {
      sender: ChatSenders.USER,
      text: !chatResponse?.question
        ? structuredClone(chat)
        : chatResponse.question,
    };
  
    const assistantMessage = {
      sender: ChatSenders.BOT,
      text: {
        answer: chatResponse?.answer
          ? marked(chatResponse?.answer) // Parse markdown to HTML
          : chatResponse?.error || "",
        list: isCitationError ? [] : chatResponse?.citations || [],
        isError: chatResponse?.answer === "message",
      },
    };
  
    setChatHistory((prevHistory: any) => [
      ...prevHistory,
      userMessage,
      assistantMessage,
    ]);
  
    setChatHistoryOptions({
      createdAt: chatResponse.createdAt,
      conversationId: chatResponse.topicId,
      topicId: "",
    });
  };
  
  const onReferenceClick = (item: IBotTextListItem, index: string | number) => {
    setSelectedReference({ item, index });
  };

  return (
    <div className="flex container">
      <PdfViewer
        data={viewData}
        navigateBack={navigateBack}
        selectedReference={selectedReference}
      />
      <ChatBot
        conversation={{ ...chatHistoryOptions, messages: chatHistory }}
        selectedReference={selectedReference}
        onChatKeyDown={handleChatKeyDown}
        handleSendChat={handleSendChat}
        onChatInputChange={handleChatInputChange}
        chatValue={chat}
        handlePastTopic={() => {
          setVisible(true);
          chatConversations({ filename: viewData.documentName });
        }}
        handleNewTopic={() => {
          setChatHistory([]);
          setChatHistoryOptions("");
          setSelectedReference(null);
          setConversationId("");
        }}
        handleReference={onReferenceClick}
        isSender={isSender}
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
          data={data?.data}
          table={table}
          paginator={false}
        />
      </AppDialog>
    </div>
  );
};

export default ViewDetails;
