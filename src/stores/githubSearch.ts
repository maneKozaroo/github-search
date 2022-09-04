import { defineStore } from "pinia";

export const useGithubSearchStore = defineStore({
  id: "githubSearch",

  state: () => ({
    search: {
      results: undefined,
    },
  }),

  getters: {},

  actions: {
    async search(queryString: string) {
      console.log("search with text:", queryString);
    },
  },
});
