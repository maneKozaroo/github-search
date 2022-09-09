import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import App from "./App.vue";
import ButtonBase from "./components/controls/ButtonBase.vue";
import FieldsetBase from "./components/form/FieldsetBase.vue";
import InputBase from "./components/input/InputBase.vue";
import SearchButton from "./components/GithubSearch/SearchButton.vue";
import SearchForm from "./components/GithubSearch/SearchForm.vue";
import SearchInput from "./components/GithubSearch/SearchInput.vue";
import SearchResults from "./components/GithubSearch/SearchResults.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("ButtonBase", ButtonBase);
app.component("FieldsetBase", FieldsetBase);
app.component("InputBase", InputBase);
app.component("SearchButton", SearchButton);
app.component("SearchForm", SearchForm);
app.component("SearchInput", SearchInput);
app.component("SearchResults", SearchResults);

app.mount("#app");
