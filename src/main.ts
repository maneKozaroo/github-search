import { createApp } from "vue";
import { createPinia } from "pinia";

import router from "./router";

import App from "./App.vue";
import InputBase from "./components/input/InputBase.vue";
import SearchInput from "./components/GithubSearch/SearchInput.vue";

import "./assets/main.css";

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.component("InputBase", InputBase);
app.component("SearchInput", SearchInput);

app.mount("#app");
