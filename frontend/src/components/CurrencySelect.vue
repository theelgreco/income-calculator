<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useSettingsStore } from "@/stores/settingsStore";
import { useCurrency } from "@/composables/currency";

const { settings } = storeToRefs(useSettingsStore());
const { currencies, getCurrencyFromCode } = useCurrency();
</script>

<template>
    <Select v-model="settings.currency.code" @update:model-value="code => settings.currency = getCurrencyFromCode(code as string)!">
        <SelectTrigger>
            <SelectValue :placeholder="settings.currency.label" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem v-for="currency in currencies" :key="currency.code" :value="currency.code">{{ currency.label }}</SelectItem>
        </SelectContent>
    </Select>
</template>
