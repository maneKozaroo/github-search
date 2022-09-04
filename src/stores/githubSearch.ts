import { reactive } from "vue";
import { defineStore } from "pinia";

import { apiService } from "@/services";
import type { SearchState } from "@/types";

export const useGithubSearchStore = defineStore("githubSearch", () => {
  const search = reactive<SearchState>({
    pageNumber: 1,
    results: undefined,
  });

  async function searchRepositories(userInput: string) {
    try {
      const currentPage = search.pageNumber;

      const queryString = `page=${currentPage}&q=${userInput}`;

      const results = await apiService.github.repositories.search(queryString);

      search.results = results;
    } catch (error) {
      console.log(error);
    }
  }

  return {
    search,
    searchRepositories,
  };
});
