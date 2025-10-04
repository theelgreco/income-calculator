import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { getCurrency } from "locale-currency";
import { useCurrency, type Currency } from "@/composables/currency";

interface Settings {
    language: string;
    currency: Currency;
}

function loadSettings(): Settings {
    const parsedSettings = localStorage.getItem("settings");

    if (parsedSettings !== null) {
        return JSON.parse(parsedSettings) as Settings;
    }

    const currencyCode = getCurrency(navigator.language) || "GBP";

    const { getCurrencyFromCode } = useCurrency();

    const defaultSettings: Settings = {
        language: navigator.language,
        currency: getCurrencyFromCode(currencyCode)!,
    };

    return defaultSettings;
}

export const useSettingsStore = defineStore("settings", () => {
    const settings = ref<Settings>(loadSettings());

    watch(
        settings,
        (newValue) => {
            localStorage.setItem("settings", JSON.stringify(newValue));
        },
        { immediate: false }
    );

    return { settings };
});
