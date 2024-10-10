import { useMutation, useQuery } from "@tanstack/react-query";
import { QUERY_KEY } from "../../../constants/queryConstants";
// import { apiService } from "../../../services/api/apiService";

const sampleChatResponse = {
  conversation_id: "12345",
  answer:
    "The company's revenue for 2023 was $10 million, according to the annual report.",
  citations: [
    {
      document_id: "doc1",
      page: 12,
      excerpt:
        "The revenue for 2023 was $10 million as stated in section 3.2 of the annual report.",
    },
  ],
};

const sampleConversationResponse = {
  conversations: [
    {
      conversation_id: "12345",
      created_at: "2024-10-05T12:00:00Z",
      last_interaction: "2024-10-06T08:30:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      conversation_id: "12346",
      created_at: "2024-10-03T15:00:00Z",
      last_interaction: "2024-10-03T16:00:00Z",
      summary: "User inquired about company leadership.",
    },
  ],
  total_conversations: 25,
};

const sampleCitationResponse = {
  question: "What is the revenue of the company for 2023?",
  citations: [
    {
      document_id: "doc1",
      page: 12,
      excerpt:
        "The revenue for 2023 was $10 million as stated in section 3.2 of the annual report.",
    },
    {
      document_id: "doc2",
      page: 3,
      excerpt: "Company revenue figures for 2023 show $10 million.",
    },
  ],
};

interface IPostChat {
  question: string;
  conversation_id?: string;
  document_name?: string[];
}

interface IGetConversation {
  user_id: string;
  limit: number;
  offset: number;
}

const postChatQuestion = (request: IPostChat) => {
  // return apiService.post("chat/question", request);
  return Promise.resolve(sampleChatResponse);
};

const getChatConversation = (request: IGetConversation) => {
  // return apiService.get(`chat/conversations?${request.user_id}`, request);
  return Promise.resolve(sampleConversationResponse);
};

const getChatCitation = (request: IPostChat) => {
  // return apiService.get(`chat/citations?${request.conversation_id}`, request);
  return Promise.resolve(sampleCitationResponse);
};

export const usePostChatQuestion = () => {
  return useMutation({
    mutationFn: (request: IPostChat) => postChatQuestion(request),
  });
};

export const useGetChatConversation = (request: IGetConversation) => {
  return useQuery({
    queryKey: [QUERY_KEY.getChatConversation],
    queryFn: () => getChatConversation(request),
  });
};

export const useGetChatCitation = (request: IPostChat) => {
  return useQuery({
    queryKey: [QUERY_KEY.getChatCitation],
    queryFn: () => getChatCitation(request),
  });
};
