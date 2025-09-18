import "@/assets/styles/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import Primevue from "primevue/config";
//@ts-ignore
import Aura from "@/presets/aura";
import Tooltip from "primevue/tooltip";

const pinia = createPinia();
const app = createApp(App);

app.use(Primevue, {
    unstyled: true,
    pt: Aura,
});

app.directive("tooltip", Tooltip);

app.use(pinia);
app.use(router);
app.mount("#app");
