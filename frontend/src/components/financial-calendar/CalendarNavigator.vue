<script setup lang="ts">
import { TriangleIcon } from "lucide-vue-next";
import { ref } from "vue";
import { AnimatePresence, motion } from "motion-v";

export interface CalendarNavigatorProps {
    year: number;
}

export interface CalendarNavigatorEmits {
    (event: "update:year", value: number): void;
}

type Direction = "PREV" | "NEXT";

const props = defineProps<CalendarNavigatorProps>();

const emit = defineEmits<CalendarNavigatorEmits>();

const direction = ref<Direction>();

function changeYear(newDirection: Direction) {
    direction.value = newDirection;
    const newYear = newDirection === "NEXT" ? props.year + 1 : props.year - 1;
    emit("update:year", newYear);
}
</script>

<template>
    <div class="bg-white flex justify-between items-center w-[200px] h-[50px] shadow-xl p-[3px] rounded-full border">
        <svg class="hidden">
            <defs>
                <filter id="inner-shadow" x="-50%" y="-50%" width="200%" height="200%">
                    <!-- Take the shape -->
                    <feGaussianBlur in="SourceAlpha" stdDeviation="0.7" result="blur" />
                    <feOffset dx="0" dy="0" result="offsetBlur" />

                    <!-- Make it dark -->
                    <feFlood flood-color="black" flood-opacity="0.7" result="shadowColor" />
                    <feComposite in="shadowColor" in2="offsetBlur" operator="in" result="shadow" />

                    <!-- Place inside the shape -->
                    <feComposite in="SourceGraphic" in2="shadow" operator="out" />
                </filter>
            </defs>
        </svg>
        <Button
            variant="ghost"
            class="grid place-items-center border rounded-full h-full aspect-square p-0 shadow-md active:shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.25)] group hover:bg-white"
            @click="changeYear('PREV')"
        >
            <TriangleIcon
                class="-rotate-90 fill-neutral-500 stroke-neutral-500 -translate-x-0.5 group-active:fill-neutral-600 group-active:translate-y-[1px] group-active:translate-x-[-2px]"
                filter="url(#inner-shadow)"
            />
        </Button>
        <div class="flex-grow h-full p-[4px]">
            <div
                class="relative bg-neutral-50 shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.25)] w-full h-full rounded-full font-black text-xl overflow-hidden"
            >
                <AnimatePresence>
                    <motion.p
                        :initial="{ translateX: direction ? (direction === 'PREV' ? '-250%' : '250%') : '-50%', opacity: 0 }"
                        :animate="{ translateX: '-50%', opacity: 1 }"
                        :transition="{ duration: 1, type: 'spring' }"
                        :key="year"
                        class="absolute left-1/2 top-1/2 -translate-y-1/2"
                    >
                        {{ year }}
                    </motion.p>
                </AnimatePresence>
            </div>
        </div>
        <Button
            variant="ghost"
            class="grid place-items-center border rounded-full h-full aspect-square p-0 shadow-md active:shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.25)] group hover:bg-white"
            @click="changeYear('NEXT')"
        >
            <TriangleIcon
                class="rotate-90 fill-neutral-500 stroke-neutral-500 translate-x-0.5 group-active:fill-neutral-600 group-active:translate-y-[1px] group-active:translate-x-[2px]"
                filter="url(#inner-shadow)"
            />
        </Button>
    </div>
</template>
