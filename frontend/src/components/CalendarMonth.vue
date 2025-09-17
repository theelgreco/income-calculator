<script setup lang="ts">
import { defineProps } from "vue";
import Skeleton from "primevue/skeleton";

interface Props {
    monthName: string;
    income: number | null;
    expenses: number | null;
    remaining: number | null;
    isCurrentMonth: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <div
        class="flex flex-col items-center gap-5 border-1/2 rounded-lg p-5 shadow-sm cursor-pointer hover:border-black hover:shadow-md active:shadow-inner transition-all group"
    >
        <div class="flex items-center justify-center w-full font-medium">{{ monthName }}</div>
        <div class="flex flex-col w-full gap-5">
            <div class="flex flex-col justify-between">
                <div class="flex justify-between">
                    <p class="font-extralight">Income</p>
                    <Skeleton v-if="income === null" width="3rem" class="bg-grays-light-200" />
                    <p v-else>£{{ income.toFixed(2) }}</p>
                </div>
                <div class="flex justify-between">
                    <p class="font-extralight">Outgoings</p>
                    <Skeleton v-if="expenses === null" width="3rem" class="bg-grays-light-200" />
                    <p v-else>£{{ expenses.toFixed(2) }}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <p class="font-extralight">Spare</p>
                <Skeleton v-if="remaining === null" width="6.5rem" height="2.5rem" class="bg-grays-light-200" />
                <p v-else class="text-4xl group-hover:font-bold transition-all">£{{ remaining.toFixed(2) }}</p>
            </div>
        </div>
    </div>
</template>
