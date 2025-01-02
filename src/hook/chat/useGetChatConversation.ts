import { useMutation } from "@tanstack/react-query";
import { getPastConversations } from "./../../services/ChatBotService";

export const useGetPastConversations = () => {
  return useMutation({
    mutationFn: (request: any) => getPastConversations(request),
  });
};
