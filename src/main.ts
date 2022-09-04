import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import App from "./App.vue";
import InputBase from "./components/input/InputBase.vue";
import SearchForm from "./components/GithubSearch/SearchForm.vue";
import SearchInput from "./components/GithubSearch/SearchInput.vue";
import SearchResults from "./components/GithubSearch/SearchResults.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("InputBase", InputBase);
app.component("SearchForm", SearchForm);
app.component("SearchInput", SearchInput);
app.component("SearchResults", SearchResults);

app.mount("#app");
