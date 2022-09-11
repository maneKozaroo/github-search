<template>
  <form
    :id="FORMS.SEARCH.NAME"
    :name="FORMS.SEARCH.NAME"
    @submit.prevent="handleSearchSubmit"
  >
    <FieldsetBase :disabled="queryingThrottled">
      <SearchInput
        type="search"
        @input="handleSearchInput"
        :value="userInput"
      />

      <SearchButton type="submit">Search</SearchButton>
    </FieldsetBase>
  </form>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { FORMS } from "@/constants";
import { router } from "@/router";
import { useGithubSearchStore } from "@/stores";

const githubSearchStore = useGithubSearchStore();

const queryingThrottled = computed(() => {
  return githubSearchStore.throttled;
});

const userInput = computed(() => {
  return githubSearchStore.search.form.userInput;
});

const handleSearchInput = (event: Event) => {
  const targetInput = event.target as HTMLInputElement;

  githubSearchStore.setUserInput({ userInput: targetInput.value });

  if (targetInput.value === "") {
    router.push({
      name: "home",
    });
  }
};

const handleSearchSubmit = (event: Event) => {
  const targetForm = event.target as HTMLFormElement;

  if (!targetForm) return; // TODO: error handling

  const formData = new FormData(targetForm);

  const queryString = formData.get(FORMS.SEARCH.FIELDS.QUERY.NAME) as string;
  const encodedQueryString = encodeURIComponent(queryString);

  if (!encodedQueryString) return; // TODO: error handling

  router.push({
    name: "home",
    query: { page: 1, query: encodedQueryString },
  });
};
</script>

<style scoped></style>
