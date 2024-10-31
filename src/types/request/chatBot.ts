export interface IPostChat {
  question: string;
  conversationId?: string;
  documentName?: string;
  createdDate?: any;
}

export interface IGetConversation {
  user_id: string;
  limit: number;
  offset: number;
}
