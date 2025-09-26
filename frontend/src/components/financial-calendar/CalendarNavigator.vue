<script setup lang="ts">
import { ref, watch } from "vue";
import { AnimatePresence, motion } from "motion-v";
import { NavigatorDirection, type CalendarNavigatorEmits, type CalendarNavigatorProps } from "./types";

const props = defineProps<CalendarNavigatorProps>();

const emit = defineEmits<CalendarNavigatorEmits>();

const direction = ref<NavigatorDirection>();

const currentYear = new Date().getFullYear();

watch(
    () => props.year,
    (newValue, oldValue) => {
        direction.value = newValue > oldValue ? NavigatorDirection.NEXT : NavigatorDirection.PREVIOUS;
    }
);
</script>

<template>
    <!-- This is a fixed overlay that sits behind the navigator. It acts as an accidental touch protection and also adds some visual appeal. -->
    <div class="bg-neutral-300/50 fixed bottom-0 left-0 h-[75px] w-full blur-xl"></div>
    <!-- Button to skip back to current year -->
    <div
        v-if="year > currentYear"
        class="fixed bottom-0 left-1/2 translate-x-[-155px] -translate-y-5 h-[50px] aspect-square rounded-full p-[3px] bg-white shadow-xl"
    >
        <CalendarNavigatorButton :direction="NavigatorDirection.PREVIOUS" isDouble @click="emit('update:year', currentYear)" />
    </div>
    <div
        class="fixed bottom-0 left-1/2 -translate-x-1/2 -translate-y-5 bg-white flex justify-between items-center w-[200px] h-[50px] shadow-xl p-[3px] rounded-full border"
    >
        <SvgInnerShadow />
        <CalendarNavigatorButton :direction="NavigatorDirection.PREVIOUS" @click="emit('update:year', year - 1)" />
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
        <SvgInnerShadow />
        <CalendarNavigatorButton :direction="NavigatorDirection.NEXT" @click="emit('update:year', year + 1)" />
    </div>
    <!-- Button to skip forward to current year -->
    <div
        v-if="year < currentYear"
        class="fixed bottom-0 left-1/2 translate-x-[105px] -translate-y-5 h-[50px] aspect-square rounded-full p-[3px] bg-white shadow-xl"
    >
        <CalendarNavigatorButton :direction="NavigatorDirection.NEXT" isDouble @click="emit('update:year', currentYear)" />
    </div>
</template>
