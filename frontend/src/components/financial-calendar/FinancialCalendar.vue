<script setup lang="ts">
import { onMounted, ref, defineProps, defineEmits, watch } from "vue";
import { useRoute } from "vue-router";
import router from "@/router";
import { TransactionsApi, type GetTransactionYearResponseInner } from "@/api/generated";
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

const nullMonths = [
    {
        monthName: "January",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "February",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "March",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "April",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "May",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "June",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "July",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "August",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "September",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "October",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "November",
        income: null,
        expenses: null,
        remaining: null,
    },
    {
        monthName: "December",
        income: null,
        expenses: null,
        remaining: null,
    },
];

const months = ref<{ monthName: string; income: number | null; expenses: number | null; remaining: number | null }[]>(nullMonths);

async function getYearData() {
    try {
        months.value = nullMonths;
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
        <FinancialCalendarYear
            v-model:year="year"
            @update:year="
                months = nullMonths;
                router.replace({ name: 'year', params: { year } });
            "
        />
        <div class="flex flex-wrap justify-between max-w-full max-h-full gap-4">
            <RouterLink
                class="min-w-[300px] max-w-full w-[30%] grow"
                v-for="(month, index) in months"
                :to="{ name: 'month', params: { year, month: month.monthName } }"
            >
                <FinancialCalendarMonth
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
