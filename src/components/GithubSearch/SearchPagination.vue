<template>
  <div class="search-pagination" v-if="showPagination">
    <RouterLink
      v-for="page in paginationPages"
      :class="[
        'pagination-link',
        { disabled: queryingThrottled },
        { active: page === currentPage },
      ]"
      :key="page"
      :to="{ name: 'home', query: { ...currentRouteQuery, page } }"
      >{{ page }}</RouterLink
    >
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { router } from "@/router";
import { useGithubSearchStore } from "@/stores";

const githubSearchStore = useGithubSearchStore();

const totalPages = computed(() => {
  return githubSearchStore.totalPages || 0;
});

const showPagination = computed(() => {
  return totalPages.value > 1;
});

const paginationPages = computed(() => {
  return githubSearchStore.paginationPages;
});

const queryingThrottled = computed(() => {
  return githubSearchStore.throttled;
});

const currentRouteQuery = computed(() => {
  const currentRoute = router.currentRoute.value;

  return currentRoute.query;
});

const currentPage = computed(() => {
  return githubSearchStore.search.status.currentPage;
});
</script>

<style scoped>
.search-pagination {
  display: flex;
  justify-content: space-around;
  padding: 1rem;
}
.pagination-link {
  border: 1px solid var(--button-border-color);
  border-radius: 0.25rem;
  color: var(--text-color);
  min-width: 1.25rem;
  padding: 0.25rem;
  text-align: center;
  text-decoration: none;
}

.pagination-link.active {
  border-color: red;
}

.pagination-link.disabled {
  pointer-events: none;
}

.pagination-link.disabled:hover {
  cursor: not-allowed;
}
</style>
