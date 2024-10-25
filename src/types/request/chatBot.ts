export interface IPostChat {
  question: string;
  conversation_id?: string;
  document_name?: string[];
}

export interface IGetConversation {
  user_id: string;
  limit: number;
  offset: number;
}
