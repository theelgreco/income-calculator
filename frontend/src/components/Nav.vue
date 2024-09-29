<script setup lang="ts">
import { mdiFinance, mdiPlus } from "@mdi/js";
import { onMounted, ref } from "vue";
import Button from "primevue/button";
import SvgIcon from "@jamescoyle/vue-icon";
import CreateTransactionDialog from "./CreateTransactionDialog.vue";

const expenseType = ref<"expense" | "income">("expense");

const modalOpen = ref(false);

function openModal(value: "expense" | "income") {
    expenseType.value = value;
    modalOpen.value = true;
}

onMounted(() => {
    console.log("I'm mounted my brother");
});
</script>

<template>
    <div class="flex h-[70px] justify-between items-center px-10 py-5 gap-5 shadow-md sticky top-0 bg-white z-50">
        <div class="flex items-center gap-3 select-none">
            <SvgIcon type="mdi" :path="mdiFinance" />
            <h2 class="font-medium max-sm:hidden">Income Tracker</h2>
        </div>
        <div class="flex gap-5">
            <Button label="Add expense" @click="openModal('expense')">
                <template #icon>
                    <SvgIcon type="mdi" :path="mdiPlus" />
                </template>
            </Button>
            <Button label="Add income" @click="openModal('income')">
                <template #icon>
                    <SvgIcon type="mdi" :path="mdiPlus" />
                </template>
            </Button>
        </div>
    </div>
    <CreateTransactionDialog v-model:expenseType="expenseType" v-model:modalOpen="modalOpen" />
</template>
