import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryConstants";
import { IPostChat } from "../../types/request/chatBot";
import { getChatConversation } from "./../../services/ChatBotService";

export const useGetChatConversation = (request: IPostChat) => {
  return useQuery({
    queryKey: [QUERY_KEY.getChatCitation],
    queryFn: () => getChatConversation(request),
  });
};
