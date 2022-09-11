import { SERVICES } from "@/constants";
import { httpClient } from "@/services";
import type { SearchResponse } from "@/types";

export const apiService = {
  github: {
    repositories: {
      search: async (query: string) => {
        const urlString = SERVICES.API.GITHUB.REPOSITORIES.SEARCH.URL;

        const url = new URL(`${urlString}?${query}`);

        const response = await httpClient.get(url);

        return response.json() as Promise<SearchResponse>;
      },
    },
  },
};
