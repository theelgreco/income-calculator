<script setup lang="ts">
import Nav from "./components/Nav.vue";
import { RouterView, useRoute } from "vue-router";
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
import SidebarProvider from "./components/ui/sidebar/SidebarProvider.vue";
import MobileSidebar from "./components/MobileSidebar.vue";
import TooltipProvider from "./components/ui/tooltip/TooltipProvider.vue";

const route = useRoute();
</script>

<template>
    <Toaster position="top-center" richColors />
    <TooltipProvider>
        <SidebarProvider>
            <MobileSidebar />
            <main class="w-full flex flex-col gap-5 overscroll-none">
                <Nav v-if="route.meta.showNav" />
                <RouterView />
            </main>
        </SidebarProvider>
    </TooltipProvider>
</template>
