export interface IPostChat {
  question: string;
  conversationId?: string;
  documentName?: string;
  createdDate?: any;
  topicId?:string;
  index?:string;
}

export interface IGetConversation {
  userId: string;
  limit: number;
  offset: number;
}
