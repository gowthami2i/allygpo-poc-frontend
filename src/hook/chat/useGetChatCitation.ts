import { useMutation, useQuery } from "@tanstack/react-query";
import { getChatConversation } from "./../../services/ChatBotService";

export const useGetChatConversation = () => {
  return useMutation({
    mutationFn: (request: any) => getChatConversation(request),
  });
};
