<script setup lang="ts">
import { type Transaction, TransactionsApi } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import SvgIcon from "@jamescoyle/vue-icon";
import { onMounted, ref } from "vue";
import Divider from "primevue/divider";
import { mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";

const transactionsApi = new TransactionsApi(defaultApiConfiguration);

const transactions = ref<Transaction[] | null>(null);

async function getTransactions() {
    try {
        transactions.value = await transactionsApi.apiTransactionsGet();
    } catch (err: any) {
        console.error(err);
    }
}

async function deleteTransaction(id: string) {
    try {
        await transactionsApi.apiTransactionsIdDelete({ id });

        if (transactions.value) {
            const indexToRemove = transactions.value.findIndex((el) => el.id === id);
            transactions.value.splice(indexToRemove, 1);
        }
    } catch (err: any) {
        console.error(err);
    }
}

onMounted(() => {
    getTransactions();
});
</script>

<template>
    <div v-if="transactions && transactions.length" class="flex flex-col gap-5 w-[600px] max-w-full mx-auto px-6">
        <div
            v-for="transaction in transactions"
            :key="transaction.id"
            class="flex items-center justify-between p-3 border-1 gap-1 bg-gradient-to-tl to-green-50 from-white border-green-600 rounded"
        >
            <p class="text-xl font-medium">{{ transaction.name }}</p>
            <div class="flex items-center gap-3">
                <p class="text-xl text-green-700 mr-1">£{{ transaction.amountInPence }}</p>
                <Divider layout="vertical" class="!mx-0" />
                <div class="flex gap-2">
                    <SvgIcon
                        type="mdi"
                        :path="mdiPencilOutline"
                        class="text-grays-light-400 hover:text-grays-light-600 cursor-pointer"
                        :size="18"
                    />
                    <SvgIcon
                        type="mdi"
                        :path="mdiTrashCanOutline"
                        class="text-grays-light-400 hover:text-grays-light-600 cursor-pointer"
                        :size="18"
                        @click="deleteTransaction(transaction.id)"
                    />
                </div>
            </div>
        </div>
    </div>
</template>
