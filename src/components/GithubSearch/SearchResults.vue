<template>
  <div id="search-results">
    <div v-for="item in foundItems" :key="item.id">{{ item.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useGithubSearchStore } from "@/stores";

const githubSearchStore = useGithubSearchStore();

const foundItems = computed(() => {
  return githubSearchStore.search.results?.items || [];
});
</script>

<style scoped>
#search-results {
  color: var(--text-color);
}
</style>
