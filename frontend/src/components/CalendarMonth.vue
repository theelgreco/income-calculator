<script setup lang="ts">
import { defineProps } from "vue";

interface Props {
    monthName: string;
    income: number;
    expenses: number;
    remaining: number;
    isCurrentMonth: boolean;
}

const props = defineProps<Props>();
</script>

<template>
    <div class="flex flex-col items-center gap-5 border-1 rounded-lg p-5 shadow">
        <div class="flex items-center justify-center w-full font-medium">{{ monthName }}</div>
        <div class="flex flex-col w-full gap-5">
            <div class="flex flex-col justify-between">
                <div class="flex justify-between">
                    <p class="font-extralight">Income</p>
                    <p>£{{ income }}</p>
                </div>
                <div class="flex justify-between">
                    <p class="font-extralight">Outgoings</p>
                    <p>£{{ expenses }}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <p class="font-extralight">Spare</p>
                <p class="text-4xl">£{{ remaining }}</p>
            </div>
        </div>
    </div>
</template>
