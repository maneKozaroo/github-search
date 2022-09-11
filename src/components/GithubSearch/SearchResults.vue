<template>
  <div id="search-results">
    <template v-if="foundItems && foundItems.length === 0">
      <div>No results found</div>
    </template>

    <template v-else>
      <div v-for="item in foundItems" :key="item.id">
        <a :href="item.html_url" v-if="item.html_url" target="_blank">{{
          item.name
        }}</a>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { computed, watch } from "vue";
import { useGithubSearchStore } from "@/stores";
import { router } from "@/router";

const githubSearchStore = useGithubSearchStore();

const foundItems = computed(() => {
  return githubSearchStore.search.results?.items;
});

const searchRepositories = () => {
  const currentRoute = router.currentRoute.value;

  let page = Number(currentRoute.query.page);
  const queryStringValue = currentRoute.query.query as string;

  if (!page || !queryStringValue) {
    githubSearchStore.reset();
    return;
  }

  if (Number.isNaN(page)) page = 1;
  const queryString = decodeURIComponent(queryStringValue);

  githubSearchStore.setCurrentPage({ currentPage: page });
  githubSearchStore.setUserInput({ userInput: queryString });

  githubSearchStore.throttledSearch(page, queryString);
};

searchRepositories();

watch(router.currentRoute, searchRepositories);
</script>

<style scoped>
#search-results {
  color: var(--text-color);
}
</style>
