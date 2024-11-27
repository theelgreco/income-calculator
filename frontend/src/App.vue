<script setup lang="ts">
import Nav from "./components/Nav.vue";
import { RouterView, useRoute } from "vue-router";
import Toast from "primevue/toast";
import ConfirmDialog from "primevue/confirmdialog";

const route = useRoute();
</script>

<template>
    <main class="w-full h-full flex flex-col gap-5 overscroll-none">
        <Nav v-if="route.meta.showNav" />
        <RouterView />
        <Toast />
        <ConfirmDialog />
    </main>
</template>
