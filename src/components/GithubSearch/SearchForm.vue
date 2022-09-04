<template>
  <form
    :id="FORMS.SEARCH.NAME"
    :name="FORMS.SEARCH.NAME"
    @submit.prevent="handleSearchSubmit"
  >
    <SearchInput type="search" />
  </form>
</template>

<script setup lang="ts">
import { FORMS } from "@/constants";

const handleSearchSubmit = (event: Event) => {
  const targetForm = event.target as HTMLFormElement;

  if (!targetForm) return;

  const formData = new FormData(targetForm);

  console.log(
    "TODO: call search action with text:",
    formData.get(FORMS.SEARCH.FIELDS.QUERY.NAME)
  );
};
</script>

<style scoped></style>
