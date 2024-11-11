import { IGetConversation, IPostChat } from "../types/request/chatBot";
import { apiService } from "./api/apiService";

export const postChatQuestion = (request: IPostChat) => {
  return apiService.post("chat/ask", request);
};

export const getPastConversations = (request: IGetConversation) => {
  return apiService.post(`file/topics`, request);
};

export const getChatConversation = (request: IPostChat) => {
  return apiService.post(`conversations`, request);
};
