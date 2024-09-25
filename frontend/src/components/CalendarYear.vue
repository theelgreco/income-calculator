<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { defineProps, defineEmits } from "vue";

interface Props {
    year: number;
}

interface Emits {
    (event: "update:year", value: number): void;
}

const props = defineProps<Props>();

const emit = defineEmits<Emits>();
</script>

<template>
    <div class="flex w-full justify-between items-center border-1 rounded-lg p-4 shadow">
        <SvgIcon type="mdi" :path="mdiChevronLeft" @click="emit('update:year', year - 1)" />
        <h1 class="text-3xl font-medium">{{ year }}</h1>
        <SvgIcon type="mdi" :path="mdiChevronRight" @click="emit('update:year', year + 1)" />
    </div>
</template>
