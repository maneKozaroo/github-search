export interface SearchResponse {
  incomplete_results: boolean;
  items: Record<string, unknown>[];
  total_count: number;
}
