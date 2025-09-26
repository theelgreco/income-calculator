import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import { VitePWA } from "vite-plugin-pwa";
import Components from "unplugin-vue-components/vite";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools(),
        Components(),
        VitePWA({
            registerType: "autoUpdate",
            manifest: {
                name: "Income Tracker",
                short_name: "IncomeTracker",
                description: "A handy tool for tracking your income and expenses",
                theme_color: "#ffffff",
                background_color: "#ffffff",
                start_url: "/",
                display: "standalone",
                orientation: "portrait",
                icons: [
                    {
                        src: "/192w/icon.png",
                        sizes: "192x192",
                        type: "image/png",
                        purpose: "any",
                    },
                    {
                        src: "/512w/icon.png",
                        sizes: "512x512",
                        type: "image/png",
                        purpose: "any",
                    },
                ],
            },
            workbox: {
                // Configure Workbox options
                skipWaiting: true,
                clientsClaim: true,
            },
        }),
    ],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
