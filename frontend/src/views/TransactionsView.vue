<script setup lang="ts">
import { type Transaction, TransactionsApi } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import SvgIcon from "@jamescoyle/vue-icon";
import { onMounted, ref } from "vue";
import Divider from "primevue/divider";
import { mdiCardsOutline, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { useToast } from "primevue/usetoast";
import { useConfirm } from "primevue/useconfirm";

const toast = useToast();

const confirm = useConfirm();

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

const confirmDelete = (transaction: Transaction) => {
    confirm.require({
        message: `Are you sure you want to delete ${transaction.name}?`,
        header: "Delete transaction",
        rejectProps: {
            label: "Cancel",
            severity: "secondary",
            outlined: true,
            class: "mr-auto",
        },
        acceptProps: {
            label: "Delete",
            severity: "danger",
        },
        accept: async () => {
            deleteTransaction(transaction.id);
            toast.add({ severity: "info", summary: "Deleted", detail: `You have deleted ${transaction.name}`, life: 3000 });
        },
    });
};

onMounted(() => {
    getTransactions();
});
</script>

<template>
    <div>
        <div v-if="transactions && transactions.length" class="flex flex-col gap-5 w-[600px] max-w-full mx-auto px-6">
            <div
                v-for="transaction in transactions"
                :key="transaction.id"
                class="flex items-center justify-between p-3 border-1 gap-1 bg-gradient-to-tl rounded"
                :class="{
                    'to-green-50 from-white border-green-600 text-green-700': !transaction.isExpense,
                    'to-red-50 from-white border-red-600 text-red-700': transaction.isExpense,
                }"
            >
                <p class="text-xl font-medium">{{ transaction.name }}</p>
                <div class="flex items-center gap-3">
                    <p class="text-xl mr-1">£{{ transaction.amountInPence }}</p>
                    <Divider layout="vertical" class="!mx-0" />
                    <div class="flex gap-2">
                        <div v-tooltip.bottom="`Edit ${transaction.name}`">
                            <SvgIcon
                                type="mdi"
                                :path="mdiPencilOutline"
                                class="text-grays-light-400 hover:text-grays-light-600 cursor-pointer"
                                :size="18"
                            />
                        </div>
                        <div v-tooltip.bottom="`Delete ${transaction.name}`">
                            <SvgIcon
                                type="mdi"
                                :path="mdiTrashCanOutline"
                                class="text-grays-light-400 hover:text-grays-light-600 cursor-pointer"
                                :size="18"
                                @click="confirmDelete(transaction)"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="transactions && !transactions.length" class="w-full h-full flex flex-col items-center justify-center mb-20">
            <SvgIcon type="mdi" :path="mdiCardsOutline" :size="192" class="text-grays-light-300" />
            <p class="font-medium">No transactions to show</p>
            <p class="font-light">Add a new transaction to get started</p>
        </div>
    </div>
</template>
