import { useQuery } from "@tanstack/react-query";
import { IGetConversation } from "../../types/request/chatBot";
import { QUERY_KEY } from "../../constants/queryConstants";
import { getPastConversations } from "./../../services/ChatBotService";

export const useGetPastConversations = (request: IGetConversation) => {
  return useQuery({
    queryKey: [QUERY_KEY.getChatConversation],
    queryFn: () => getPastConversations(request),
  });
};
