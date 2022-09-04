export interface SearchResult {
  id: number;
  name: string;
}
export interface SearchResponse {
  incomplete_results?: boolean;
  items?: SearchResult[];
  total_count?: number;
}
