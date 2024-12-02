import "@/assets/main.css";

import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import Primevue from "primevue/config";
//@ts-ignore
import Aura from "@/presets/aura";
import Tooltip from "primevue/tooltip";
import ToastService from "primevue/toastservice";
import ConfirmationService from "primevue/confirmationservice";

if (navigator.serviceWorker.controller) {
} else {
    navigator.serviceWorker.register("/install-sw.js").then((reg) => {});
}

const app = createApp(App);

app.use(router);

app.use(Primevue, {
    unstyled: true,
    pt: Aura,
});

app.use(ToastService);

app.use(ConfirmationService);

app.directive("tooltip", Tooltip);

app.mount("#app");
