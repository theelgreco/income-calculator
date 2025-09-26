<script setup lang="ts">
import { type MotionProps, motion } from "motion-v";
import type { Component } from "vue";

interface Props {
    title: string;
    description: string;
    icon: Component;
    delayIndex: number;
}

const props = defineProps<Props>();

const ICON_DELAY_INTERVAL = 0.25;

const iconMotions: MotionProps = {
    initial: { strokeWidth: 0, opacity: 0, rotate: -90, left: "10%" },
    animate: { strokeWidth: 0.25, opacity: 0.05, rotate: 0, left: "0%" },
    transition: { type: "spring", delay: ICON_DELAY_INTERVAL * props.delayIndex },
};
</script>

<template>
    <div class="relative p-10 rounded border bg-card overflow-hidden">
        <h3 class="text-md xl:text-lg font-semibold">{{ title }}</h3>
        <small class="line-clamp-2">{{ description }}</small>
        <motion.svg asChild v-bind="iconMotions">
            <component :is="icon" :size="200" class="absolute top-0 group-hover:opacity-15!" />
        </motion.svg>
    </div>
</template>
