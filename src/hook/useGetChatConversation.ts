import { useQuery } from "@tanstack/react-query";
import { IGetConversation } from "../types/request/chatBot";
import { QUERY_KEY } from "../constants/queryConstants";
import { getChatConversation } from "../services/ChatBotService";

export const useGetChatConversation = (request: IGetConversation) => {
  return useQuery({
    queryKey: [QUERY_KEY.getChatConversation],
    queryFn: () => getChatConversation(request),
  });
};
