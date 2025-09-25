<script setup lang="ts">
defineProps<{ text: string }>();
</script>

<template>
    <label>{{ text }}</label>
</template>
