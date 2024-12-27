import { apiSlice } from "../Api/apiSlice";
import { IFlashCard, IFlashCardCreateRequest, IFlashCardRequest, IFlashCardResponse } from "./types/FlashCard";

const endpoint = "/flash-cards";

function parseQueryParams(query: IFlashCardRequest) {
  const params = new URLSearchParams();
  if (query.topic) params.append("topic", query.topic);
  
  if (query.page) params.append("page", query.page.toString());
  
  if (query.limit) params.append("limit", query.limit.toString());
  
  if (query.search) params.append("search", query.search);
  
  return params;
}

function getFlashCards(query: IFlashCardRequest) {
  const params = parseQueryParams(query);
  
  return `${endpoint}?${params.toString()}`;
}

function createFlashCard(data: IFlashCardCreateRequest) {
  return {
    url: endpoint,
    method: "POST",
    body: data
  };
}

function getTopics() {
  return `${endpoint}/topics`;
}

function getFlashCardById(id: string) {
  return `${endpoint}/${id}`;
}

function getFlashCardsByTopic(topic: string) {
  return `${endpoint}/topic/${topic}`;
}

export const flashCardApiSlice = apiSlice.injectEndpoints({
  endpoints: ({ query, mutation }) => ({
    getFlashCards: query<IFlashCardResponse, IFlashCardRequest>({
      query: (query) => getFlashCards(query),
      providesTags: ["flash-cards"]
    }),
    createFlashCard: mutation<IFlashCard, IFlashCardCreateRequest>({
      query: (data) => createFlashCard(data),
      invalidatesTags: ["flash-cards"]
    }),
    getTopics: query<string[], void>({
      query: () => getTopics(),
      providesTags: ["topics"]
    }),
    getFlashCardById: query<IFlashCard, string>({
      query: (id) => getFlashCardById(id),
      providesTags: ["flash-cards"]
    }),
    getFlashCardsByTopic: query<IFlashCardResponse, string>({
      query: (topic) => getFlashCardsByTopic(topic),
      providesTags: ["flash-cards"]
    })
  }),
});

export const {
  useGetFlashCardsQuery,
  useCreateFlashCardMutation,
  useGetTopicsQuery,
  useGetFlashCardByIdQuery,
  useGetFlashCardsByTopicQuery,
} = flashCardApiSlice;