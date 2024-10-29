import { useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../constants/queryConstants";
import { IPostChat } from "../../types/request/chatBot";
import { getChatCitation } from "./../../services/ChatBotService";

export const useGetChatCitation = (request: IPostChat) => {
  return useQuery({
    queryKey: [QUERY_KEY.getChatCitation],
    queryFn: () => getChatCitation(request),
  });
};
