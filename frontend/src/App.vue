<script setup lang="ts">
import { RouterView, useRoute } from "vue-router";
import "vue-sonner/style.css";

const route = useRoute();
</script>

<template>
    <!-- Global toast component - Sonner -->
    <Sonner position="top-center" richColors />
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
