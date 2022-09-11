<template>
  <div v-if="showPagination">
    <RouterLink
      v-for="page in paginationPages"
      :class="['pagination-link', { disabled: queryingThrottled }]"
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
</script>

<style scoped>
.pagination-link {
  color: var(--text-color);
}

.pagination-link.disabled {
  pointer-events: none;
}

.pagination-link.disabled:hover {
  cursor: not-allowed;
}
</style>
