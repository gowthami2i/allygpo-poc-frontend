import {
  sampleChatResponse,
  sampleCitationResponse,
  sampleConversationResponse,
} from "../components/table/data";
import { IGetConversation, IPostChat } from "../types/request/chatBot";
// import { apiService } from "../../../services/api/apiService";

export const postChatQuestion = (request: IPostChat) => {
  // return apiService.post("chat/question", request);
  return Promise.resolve(sampleChatResponse);
};

export const getChatConversation = (request: IGetConversation) => {
  // return apiService.get(`chat/conversations?${request.user_id}`, request);
  return Promise.resolve(sampleConversationResponse);
};

export const getChatCitation = (request: IPostChat) => {
  // return apiService.get(`chat/citations?${request.conversation_id}`, request);
  return Promise.resolve(sampleCitationResponse);
};
