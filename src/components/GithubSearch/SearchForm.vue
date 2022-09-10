<template>
  <form
    :id="FORMS.SEARCH.NAME"
    :name="FORMS.SEARCH.NAME"
    @submit.prevent="handleSearchSubmit"
  >
    <FieldsetBase>
      <SearchInput type="search" />

      <SearchButton type="submit">Search</SearchButton>
    </FieldsetBase>
  </form>
</template>

<script setup lang="ts">
import { FORMS } from "@/constants";
import { useGithubSearchStore } from "@/stores";

const githubSearchStore = useGithubSearchStore();
import { router } from "@/router";

const handleSearchSubmit = (event: Event) => {
  const targetForm = event.target as HTMLFormElement;

  if (!targetForm) return; // TODO: error handling

  const formData = new FormData(targetForm);

  const queryString = formData.get(FORMS.SEARCH.FIELDS.QUERY.NAME);

  if (!queryString) return; // TODO: error handling

  githubSearchStore.searchRepositories(queryString as string);
};
</script>

<style scoped></style>
