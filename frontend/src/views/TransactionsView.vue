<script setup lang="ts">
import { type Transaction, TransactionsApi } from "@/api/generated";
import { defaultApiConfiguration } from "@/fetch";
import SvgIcon from "@jamescoyle/vue-icon";
import { onMounted, ref } from "vue";
import Divider from "primevue/divider";
import { mdiCardsOutline, mdiPencilOutline, mdiTrashCanOutline } from "@mdi/js";
import { toast } from "vue-sonner";
import ConfirmTransactionDeleteDialog from "@/components/dialogs/ConfirmTransactionDeleteDialog.vue";

const transactionsApi = new TransactionsApi(defaultApiConfiguration);

const transactions = ref<Transaction[] | null>(null);

const deleteConfirmDialog = ref();

const selectedTransactionId = ref<string | null>();

async function getTransactions() {
    try {
        transactions.value = await transactionsApi.apiTransactionsGet();
    } catch (err: any) {
        console.error(err);
    }
}

async function deleteTransaction() {
    if (selectedTransactionId.value) {
        try {
            await transactionsApi.apiTransactionsIdDelete({ id: selectedTransactionId.value });

            if (transactions.value) {
                const indexToRemove = transactions.value.findIndex((el) => el.id === selectedTransactionId.value);
                transactions.value.splice(indexToRemove, 1);
            }

            selectedTransactionId.value = null;

            toast("Transaction deleted successfully");
        } catch (err: any) {
            console.error(err);
        }
    }
}

onMounted(() => {
    getTransactions();
});
</script>

<template>
    <div>
        <ConfirmTransactionDeleteDialog ref="deleteConfirmDialog" @confirm="() => deleteTransaction()" />
        <div v-if="transactions && transactions.length" class="flex flex-col gap-5 w-[600px] max-w-full mx-auto px-6">
            <div
                v-for="transaction in transactions"
                :key="transaction.id"
                class="flex items-center justify-between p-3 border-1 gap-1 bg-linear-to-tl rounded-sm"
                :class="{
                    'to-green-50 from-white border-green-600 text-green-700': !transaction.isExpense,
                    'to-red-50 from-white border-red-600 text-red-700': transaction.isExpense,
                }"
            >
                <p class="text-xl font-medium">{{ transaction.name }}</p>
                <div class="flex items-center gap-3">
                    <p class="text-xl mr-1">£{{ parseFloat(transaction.amountInPence).toFixed(2) }}</p>
                    <Divider layout="vertical" class="mx-0!" />
                    <div class="flex gap-2">
                        <RouterLink :to="{ name: 'editTransaction', params: { transaction: transaction.id } }">
                            <div v-tooltip.bottom="`Edit ${transaction.name}`">
                                <SvgIcon
                                    type="mdi"
                                    :path="mdiPencilOutline"
                                    class="text-grays-light-400 hover:text-grays-light-600 cursor-pointer"
                                    :size="18"
                                />
                            </div>
                        </RouterLink>
                        <div v-tooltip.bottom="`Delete ${transaction.name}`">
                            <SvgIcon
                                type="mdi"
                                :path="mdiTrashCanOutline"
                                class="text-grays-light-400 hover:text-grays-light-600 cursor-pointer"
                                :size="18"
                                @click="
                                    selectedTransactionId = transaction.id;
                                    deleteConfirmDialog.open = true;
                                "
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-else class="w-full h-full flex flex-col items-center justify-center mb-20">
            <SvgIcon type="mdi" :path="mdiCardsOutline" :size="192" class="text-grays-light-300" />
            <p class="font-medium">No transactions to show</p>
            <p class="font-light">Add a new transaction to get started</p>
        </div>
    </div>
</template>
