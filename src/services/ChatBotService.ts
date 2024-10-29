import {
  sampleChatResponse,
  sampleCitationResponse,
  samplePastConversationResponse,
} from "../mockData/data";
import { IGetConversation, IPostChat } from "../types/request/chatBot";
import { apiService } from "./api/apiService";

export const postChatQuestion = (request: IPostChat) => {
  // return apiService.post("chat/ask", request);
  return Promise.resolve({ data: sampleChatResponse });
};

export const getPastConversations = (request: IGetConversation) => {
  // return apiService.get(`chat/pastTopics?${request.user_id}`, request);
  return Promise.resolve(samplePastConversationResponse);
};

export const getChatConversation = (request: IPostChat) => {
  // return apiService.get(`chat/conversations?${request.topicId}`, request);
  return Promise.resolve(sampleCitationResponse);
};
