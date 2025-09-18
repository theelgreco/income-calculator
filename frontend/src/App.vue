<script setup lang="ts">
import Nav from "./components/Nav.vue";
import { RouterView, useRoute } from "vue-router";
import { Toaster } from "./components/ui/sonner";
import "vue-sonner/style.css";
import ConfirmDialog from "primevue/confirmdialog";

const route = useRoute();
</script>

<template>
    <Toaster position="top-right" />
    <main class="w-full h-full flex flex-col gap-5 overscroll-none">
        <Nav v-if="route.meta.showNav" />
        <RouterView />
    </main>
    <ConfirmDialog />
</template>
