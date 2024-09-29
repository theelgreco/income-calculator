<script setup lang="ts">
import { onMounted, ref, defineProps, defineEmits, watch } from "vue";
import CalendarYear from "./CalendarYear.vue";
import CalendarMonth from "./CalendarMonth.vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { TransactionsApi, type GetTransactionYearResponseInner } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import { RouterLink } from "vue-router";

interface Props {
    updateTrigger: boolean;
}

interface Emits {
    (event: "update:updateTrigger", value: boolean): void;
}

const route = useRoute();

const props = defineProps<Props>();

const emit = defineEmits<Emits>();

const transactionsApi = new TransactionsApi(defaultApiConfiguration);

const year = ref<number>(Array.isArray(route.params.year) ? parseInt(route.params.year[0]) : parseInt(route.params.year));

const months = ref<GetTransactionYearResponseInner[]>([
    {
        monthName: "January",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "February",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "March",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "April",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "May",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "June",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "July",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "August",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "September",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "October",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "November",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
    {
        monthName: "December",
        income: 0.0,
        expenses: 0.0,
        remaining: 0.0,
    },
]);

async function getYearData() {
    try {
        const response = await transactionsApi.apiTransactionsYearGet({ year: year.value });
        months.value = response;
    } catch (err: any) {
        console.error(err);
    }
}

watch(
    () => props.updateTrigger,
    async () => {
        if (props.updateTrigger) {
            await getYearData();
            emit("update:updateTrigger", false);
        }
    }
);

watch(
    () => route.params.year,
    async () => {
        year.value = Array.isArray(route.params.year) ? parseInt(route.params.year[0]) : parseInt(route.params.year);
        await getYearData();
    }
);

onMounted(async () => {
    await getYearData();
});
</script>

<template>
    <div class="w-full h-full flex flex-col gap-4">
        <CalendarYear v-model:year="year" @update:year="router.replace({ name: 'year', params: { year } })" />
        <div class="flex flex-wrap justify-between max-w-full max-h-full gap-4">
            <RouterLink
                class="min-w-[300px] max-w-full w-[30%] flex-grow"
                v-for="(month, index) in months"
                :to="{ name: 'month', params: { year, month: month.monthName } }"
            >
                <CalendarMonth
                    :key="month.monthName"
                    :monthName="month.monthName"
                    :income="month.income"
                    :expenses="month.expenses"
                    :remaining="month.remaining"
                    :isCurrentMonth="new Date().getMonth() === index"
                />
            </RouterLink>
        </div>
    </div>
</template>
