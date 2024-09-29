<script setup lang="ts">
import Calendar from "@/components/Calendar.vue";
import { ref } from "vue";

const updateTrigger = ref(false);
</script>

<template>
    <Calendar v-model:updateTrigger="updateTrigger" class="px-10" />
</template>
