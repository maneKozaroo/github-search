import { computed, reactive } from "vue";
import { defineStore } from "pinia";
import { apiService } from "@/services";
import { throttle } from "@/utils";
import type { SearchFunction, SearchState } from "@/types";

export const useGithubSearchStore = defineStore("githubSearch", () => {
  const initialState = (): SearchState => ({
    form: {
      userInput: "",
    },
    status: {
      currentPage: 1,
      loading: false,
    },
    results: undefined,
    throttling: {
      timeframe: 60000,
      requestLimit: 10,
      requestTimes: [],
    },
  });

  /**
   * State
   */
  const search = reactive(initialState());

  /**
   * Actions
   */
  const reset = () => {
    Object.assign(search, initialState());
  };

  const throttledSearch = throttle<SearchFunction>({
    ...search.throttling,
    throttledFunction: async (page: number, queryString: string) => {
      try {
        const queryComponent = `page=${page}&q=${queryString}`;

        search.status.loading = true;

        const results = await apiService.github.repositories.search(
          queryComponent
        );

        search.results = results;
      } catch (error) {
        console.log(error);
      } finally {
        search.status.loading = false;
      }
    },
  });

  const setCurrentPage = ({ currentPage }: { currentPage: number }) => {
    search.status.currentPage = currentPage;
  };

  const setUserInput = ({ userInput }: { userInput: string }) => {
    search.form.userInput = userInput;
  };

  /**
   * Getters
   */
  const paginationPages = computed(() => {
    const pageCount = totalPages.value;
    const desiredLinkPadding = 4;
    const desiredLinkCount = desiredLinkPadding * 2 + 1;

    if (pageCount === 0) return null;

    if (pageCount <= desiredLinkCount) {
      return Array.from(Array(pageCount), (_, index) => {
        return index + 1;
      });
    }

    const desiredLeft = search.status.currentPage - desiredLinkPadding;
    const desiredRight = search.status.currentPage + desiredLinkPadding;

    const leftOverflowed = desiredLeft < 1;
    const rightOverflowed = desiredRight > pageCount;

    const leftAddition = rightOverflowed ? desiredRight - pageCount : 0;
    const rightAddition = leftOverflowed ? Math.abs(desiredLeft) + 1 : 0;

    const totalLeft = desiredLeft - leftAddition;
    const totalRight = desiredRight + rightAddition;

    const left = totalLeft < 1 ? 1 : totalLeft;
    const right = totalRight > pageCount ? pageCount : totalRight;

    const pages: number[] = [];
    for (let i = left; i <= right; i += 1) {
      pages.push(i);
    }

    return pages;
  });

  const throttled = computed(() => {
    return (
      search.throttling.requestTimes.length >= search.throttling.requestLimit
    );
  });

  const totalPages = computed(() => {
    const itemsPerPage = 30;
    const totalItems = search.results?.total_count || 0;

    return Math.ceil(totalItems / itemsPerPage);
  });

  return {
    // State
    search,

    // Actions
    reset,
    setCurrentPage,
    setUserInput,
    throttledSearch,

    // Getters
    paginationPages,
    throttled,
    totalPages,
  };
});
