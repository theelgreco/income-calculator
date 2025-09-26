<script setup lang="ts">
import { ref } from "vue";

const updateTrigger = ref(false);
</script>

<template>
    <FinancialCalendar v-model:updateTrigger="updateTrigger" class="px-5 sm:px-10" />
</template>
