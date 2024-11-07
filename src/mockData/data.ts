export const topicsData: any = [
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
  {
    question: "What are the conditions for termination ?",
    createdDate: "09/03/2024",
  },
];

export const contractType = [
  { name: "Partnership Contract", code: "partnershipContract" },
  { name: "Fixed Price Contract", code: "fixedPriceContract" },
];

export const sampleChatResponse = {
  topicId: "12345",
  answer:
    "The company's revenue for 2023 was $10 million, according to the annual report.",
  citations: [
    {
      page_no: "4",
      start_end_strings: ["Termination.", "e 1"],
    },
  ],
};

export const samplePastConversationResponse = {
  conversations: [
    {
      topicId: "12345",
      createdAt: "2024-10-05T12:00:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      topicId: "12346",
      createdAt: "2024-10-03T15:00:00Z",
      summary: "User inquired about company leadership.",
    },
    {
      topicId: "12345",
      createdAt: "2024-10-05T12:00:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      topicId: "12346",
      createdAt: "2024-10-03T15:00:00Z",
      summary: "User inquired about company leadership.",
    },
    {
      topicId: "12345",
      createdAt: "2024-10-05T12:00:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      topicId: "12346",
      createdAt: "2024-10-03T15:00:00Z",
      summary: "User inquired about company leadership.",
    },
    {
      topicId: "12345",
      createdAt: "2024-10-05T12:00:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      topicId: "12346",
      createdAt: "2024-10-03T15:00:00Z",
      summary: "User inquired about company leadership.",
    },
    {
      topicId: "12345",
      createdAt: "2024-10-05T12:00:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      topicId: "12346",
      createdAt: "2024-10-03T15:00:00Z",
      summary: "User inquired about company leadership.",
    },
    {
      topicId: "12345",
      createdAt: "2024-10-05T12:00:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      topicId: "12346",
      createdAt: "2024-10-03T15:00:00Z",
      summary: "User inquired about company leadership.",
    },
    {
      topicId: "12345",
      createdAt: "2024-10-05T12:00:00Z",
      summary: "User asked about the company's revenue for 2023.",
    },
    {
      topicId: "12346",
      createdAt: "2024-10-03T15:00:00Z",
      summary: "User inquired about company leadership.",
    },
  ],
  total_conversations: 25,
};

export const sampleCitationResponse = {
  topicId: "12345",
  topicDescription: " the user spoke about…..",
  conversations: [
    {
      question: "User asked about the company's revenue for 2023.",
      answer:
        "The company's revenue for 2023 was $10 million, according to the annual report.",
      citations: [
        {
          page_no: "4",
          start_end_strings: ["Termination.", "e 1"],
        },
        {
          page_no: "5",
          start_end_strings: [
            "information to, GPO. The Representative will also",
            "purchase price of the products or services sold to",
          ],
        },
      ],
    },
    {
      question: "User inquired about company leadership.",
      answer: "User inquired about company leadership.",
      citations: [
        {
          document_id: "doc1",
          page: 1,
          paragraph: 8,
          startIndex: 90,
          endIndex: 150,
          excerpt:
            "The revenue for 2023 was $10 million as stated in section 3.2 of the annual report.",
        },
        {
          document_id: "doc2",
          page: 8,
          paragraph: 4,
          startIndex: 90,
          endIndex: 150,
          excerpt: "Company revenue figures for 2023 show $10 million.",
        },
      ],
    },
  ],
};
