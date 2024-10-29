import { useMutation } from "@tanstack/react-query";
import { IPostChat } from "../../types/request/chatBot";
import { postChatQuestion } from "./../../services/ChatBotService";

export const usePostChatQuestion = () => {
  return useMutation({
    mutationFn: (request: IPostChat) => postChatQuestion(request),
  });
};
