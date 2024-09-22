<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { defineProps } from "vue";

interface Props {
    year: number;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex w-full justify-between items-center border-1 rounded-lg p-4 shadow">
        <SvgIcon type="mdi" :path="mdiChevronLeft" />
        <h1 class="text-3xl font-medium">{{ year }}</h1>
        <SvgIcon type="mdi" :path="mdiChevronRight" />
    </div>
</template>
