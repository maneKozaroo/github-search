import type { SearchResponse } from "./api";

export type SearchFunction = (page: number, queryString: string) => void;
export interface SearchState {
  form: {
    userInput: string;
  };
  status: {
    currentPage: number;
    loading: boolean;
  };
  results?: SearchResponse;
  throttling: {
    timeframe: number;
    requestLimit: number;
    requestTimes: number[];
  };
}
