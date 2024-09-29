<script setup lang="ts">
import Nav from "./components/Nav.vue";
import { RouterView } from "vue-router";
</script>

<template>
    <main class="w-full h-full flex flex-col gap-5 overscroll-none">
        <Nav />
        <RouterView />
    </main>
</template>
