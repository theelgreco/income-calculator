<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { defineProps, defineEmits } from "vue";
import { RouterLink } from "vue-router";

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
    <div class="flex w-full justify-between items-center">
        <div class="p-1 cursor-pointer hover:bg-grays-light-100">
            <SvgIcon type="mdi" :path="mdiChevronLeft" @click="emit('update:year', year - 1)" class="cursor-pointer" />
        </div>
        <div class="flex flex-col gap-1 items-center">
            <h1 class="text-lg font-medium select-none">{{ year }}</h1>
            <RouterLink v-if="year !== new Date().getFullYear()" :to="{ name: 'year', params: { year: new Date().getFullYear() } }">
                Go to current year
            </RouterLink>
        </div>
        <div class="p-1 cursor-pointer hover:bg-grays-light-100">
            <SvgIcon type="mdi" :path="mdiChevronRight" @click="emit('update:year', year + 1)" />
        </div>
    </div>
</template>
