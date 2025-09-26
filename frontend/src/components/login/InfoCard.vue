<script setup lang="ts">
interface Props {
    title: string;
    description: string;
}

defineProps<Props>();
</script>

<template>
    <div class="relative p-10 rounded border bg-card overflow-hidden">
        <h3 class="text-md xl:text-lg font-semibold">{{ title }}</h3>
        <small class="line-clamp-2">{{ description }}</small>
        <slot></slot>
    </div>
</template>
