export interface SearchResult {
  id: number;
  name: string;
  html_url: string;
}
export interface SearchResponse {
  incomplete_results?: boolean;
  items?: SearchResult[];
  total_count?: number;
}
