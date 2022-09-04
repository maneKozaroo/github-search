import { httpClient } from "./httpClient";
import type { SearchResponse } from "@/types";

export const apiService = {
  github: {
    repositories: {
      search: async (query: string) => {
        const urlString = "https://api.github.com/search/repositories";

        const url = new URL(`${urlString}?${query}`);

        const response = await httpClient.get(url);

        return response.json() as Promise<SearchResponse>;
      },
    },
  },
};
