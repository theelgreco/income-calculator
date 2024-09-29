<script setup lang="ts">
import { ApiTransactionsYearMonthGetMonthEnum, TransactionsApi, type GetTransactionMonthResponseInner } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";

const route = useRoute();

const year = ref<number>(Array.isArray(route.params.year) ? parseInt(route.params.year[0]) : parseInt(route.params.year));

const month = ref<string>(Array.isArray(route.params.month) ? route.params.month[0] : route.params.month);

const transactionApi = new TransactionsApi(defaultApiConfiguration);

const dates = ref<GetTransactionMonthResponseInner[] | null>(null);

async function getTransactions() {
    try {
        dates.value = await transactionApi.apiTransactionsYearMonthGet({
            year: year.value,
            month: month.value as ApiTransactionsYearMonthGetMonthEnum,
        });
    } catch (err: any) {
        console.error(err);
    }
}

onMounted(() => {
    getTransactions();
});
</script>

<template>
    <h1>Hello</h1>
</template>
