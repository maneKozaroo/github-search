import type { SearchResponse } from "./api";

export interface SearchState {
  pageNumber: number;
  results?: SearchResponse;
}
