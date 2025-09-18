<script setup lang="ts">
import Nav from "./components/Nav.vue";
import { RouterView, useRoute } from "vue-router";
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
import SidebarProvider from "./components/ui/sidebar/SidebarProvider.vue";
import MobileSidebar from "./components/MobileSidebar.vue";

const route = useRoute();
</script>

<template>
    <Toaster position="top-right" />
    <SidebarProvider>
        <MobileSidebar />
        <main class="w-full h-full flex flex-col gap-5 overscroll-none">
            <Nav v-if="route.meta.showNav" />
            <RouterView />
        </main>
    </SidebarProvider>
</template>
