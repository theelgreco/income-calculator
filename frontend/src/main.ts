import '@/assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Primevue from "primevue/config"
//@ts-ignore
import Aura from "@/presets/aura"

const app = createApp(App)

app.use(router)

app.use(Primevue, {
    unstyled: true,
    pt: Aura
})

app.mount('#app')
