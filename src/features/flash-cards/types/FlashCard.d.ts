export type IFlashCard = {
  _id: string;
  topic: string;
  // user: ObjectId;
  question: string;
  answer: string;
  tags: string[];
};

export interface IFlashCardResponse {
  data: IFlashCard[];
  page: number;
  limit: number;
  total: number;
}

export interface IFlashCardRequest {
  topic?: string;
  page?: number;
  limit?: number;
  search?: string;
}

export interface IFlashCardCreateRequest {
  topic: string;
  quantityCards: number;
}