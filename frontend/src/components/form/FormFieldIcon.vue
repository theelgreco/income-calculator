<script setup lang="ts">
import type { Component } from "vue";

defineProps<{ icon: Component }>();
</script>

<template>
    <span class="absolute start-0 inset-y-0 flex items-center justify-center px-3">
        <component :is="icon" class="size-4 text-muted-foreground/50 group-focus-within:text-black" />
    </span>
</template>
