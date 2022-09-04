<template>
  <div id="search-results">
    {{ searchResults }}
  </div>
</template>

<script setup lang="ts">
import { useGithubSearchStore } from "@/stores";

const githubSearchStore = useGithubSearchStore();

const searchResults = githubSearchStore.search;
</script>

<style scoped>
#search-results {
  color: var(--text-color);
}
</style>
