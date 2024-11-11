export interface IPostChat {
  question: string;
  conversationId?: string;
  documentName?: string;
  createdDate?: any;
  topicId?:string;
}

export interface IGetConversation {
  userId: string;
  limit: number;
  offset: number;
}
