<script setup lang="ts">
import { defineProps } from "vue";
import { useCurrency } from "@/composables/currency";
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/stores/settingsStore";

interface Props {
    monthName: string;
    income: number | null;
    expenses: number | null;
    remaining: number | null;
    isCurrentMonth: boolean;
}

const props = defineProps<Props>();

const { getFormattedCurrencyString } = useCurrency();
const { settings } = storeToRefs(useSettingsStore());
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
                    <Skeleton v-if="income === null" class="w-12" />
                    <p v-else>{{ getFormattedCurrencyString(income, settings.currency.code) }}</p>
                </div>
                <div class="flex justify-between">
                    <p class="font-extralight">Outgoings</p>
                    <Skeleton v-if="expenses === null" class="w-12" />
                    <p v-else>{{ getFormattedCurrencyString(expenses, settings.currency.code) }}</p>
                </div>
            </div>
            <div class="flex justify-between">
                <p class="font-extralight">Spare</p>
                <Skeleton v-if="remaining === null" class="w-26 h-10" />
                <p v-else class="text-4xl group-hover:font-bold transition-all">
                    {{ getFormattedCurrencyString(remaining, settings.currency.code) }}
                </p>
            </div>
        </div>
    </div>
</template>
