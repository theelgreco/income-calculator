<script setup lang="ts">
import { ref } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { NavigatorDirection, type CalendarNavigatorEmits, type CalendarNavigatorProps } from "./types";

const props = defineProps<CalendarNavigatorProps>();

const emit = defineEmits<CalendarNavigatorEmits>();

const direction = ref<NavigatorDirection>();

function changeYear(newDirection: NavigatorDirection) {
    direction.value = newDirection;
    const newYear = newDirection === NavigatorDirection.NEXT ? props.year + 1 : props.year - 1;
    emit("update:year", newYear);
}
</script>

<template>
    <div class="bg-white flex justify-between items-center w-[200px] h-[50px] shadow-xl p-[3px] rounded-full border">
        <SvgInnerShadow />
        <CalendarNavigatorButton :direction="NavigatorDirection.PREVIOUS" @click="changeYear(NavigatorDirection.PREVIOUS)" />
        <div class="flex-grow h-full p-[4px]">
            <div
                class="relative bg-neutral-50 shadow-[inset_0_1px_4px_0_rgba(0,0,0,0.25)] w-full h-full rounded-full font-black text-xl overflow-hidden"
            >
                <AnimatePresence>
                    <motion.p
                        :initial="{
                            translateX: direction ? (direction === NavigatorDirection.PREVIOUS ? '-250%' : '250%') : '-50%',
                            opacity: 0,
                        }"
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
        <CalendarNavigatorButton :direction="NavigatorDirection.NEXT" @click="changeYear(NavigatorDirection.NEXT)" />
    </div>
</template>
