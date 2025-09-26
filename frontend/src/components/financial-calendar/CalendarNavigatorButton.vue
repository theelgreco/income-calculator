<script setup lang="ts">
import { SkipBackIcon, TriangleIcon } from "lucide-vue-next";
import { NavigatorDirection, type CalendarNavigatorButtonProps } from "./types";

defineProps<CalendarNavigatorButtonProps>();
</script>

<template>
    <Button
        variant="ghost"
        :aria-label="`${direction} year`"
        class="grid place-items-center border rounded-full h-full aspect-square p-0 shadow-md active:shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.25)] group bg-white hover:bg-white"
    >
        <SkipBackIcon
            v-if="isSkip"
            class="fill-neutral-600 stroke-neutral-600 group-active:fill-neutral-800 group-active:translate-y-[1px]"
            :class="{
                '-translate-x-0.5 group-active:translate-x-[-2px]': direction === NavigatorDirection.PREVIOUS,
                'translate-x-0.5 group-active:translate-x-[2px] rotate-180': direction === NavigatorDirection.NEXT,
            }"
        />
        <TriangleIcon
            v-else
            filter="url(#inner-shadow)"
            class="fill-neutral-600 stroke-neutral-600 group-active:fill-neutral-800 group-active:translate-y-[1px]"
            :class="{
                '-translate-x-0.5 group-active:translate-x-[-2px] -rotate-90': direction === NavigatorDirection.PREVIOUS,
                'translate-x-0.5 group-active:translate-x-[2px] rotate-90': direction === NavigatorDirection.NEXT,
            }"
        />
    </Button>
</template>
