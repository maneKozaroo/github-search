import { computed, reactive } from "vue";
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

  const totalPages = computed(() => {
    const itemsPerPage = 30;
    const totalItems = search.results?.total_count || 0;

    return Math.ceil(totalItems / itemsPerPage);
  });

  return {
    search,
    searchRepositories,
    totalPages,
  };
});
