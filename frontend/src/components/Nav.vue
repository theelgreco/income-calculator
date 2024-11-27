<script setup lang="ts">
import { mdiFinance, mdiMenu, mdiPlus } from "@mdi/js";
import { ref } from "vue";
import Button from "primevue/button";
import SvgIcon from "@jamescoyle/vue-icon";
import CreateTransactionDialog from "./CreateTransactionDialog.vue";
import ProfileAvatar from "./ProfileAvatar.vue";
import { RouterLink } from "vue-router";

const expenseType = ref<"expense" | "income">("expense");

const modalOpen = ref(false);

function openModal(value: "expense" | "income") {
    expenseType.value = value;
    modalOpen.value = true;
}
</script>

<template>
    <div class="flex h-[70px] justify-between items-center px-5 sm:px-10 py-5 gap-5 shadow-md bg-white z-50">
        <RouterLink :to="{ name: 'year', params: { year: new Date().getFullYear() } }">
            <div class="flex items-center gap-3 select-none cursor-pointer">
                <SvgIcon type="mdi" :path="mdiFinance" />
                <h2 class="font-medium">Income Tracker</h2>
            </div>
        </RouterLink>
        <div class="flex gap-5 items-center">
            <RouterLink :to="{ name: 'transactions' }" class="h-full">
                <Button label="Transactions" class="max-sm:hidden h-full"></Button>
            </RouterLink>
            <Button label="Add expense" @click="openModal('expense')" class="max-sm:hidden">
                <template #icon>
                    <SvgIcon type="mdi" :path="mdiPlus" />
                </template>
            </Button>
            <Button label="Add income" @click="openModal('income')" class="max-sm:hidden">
                <template #icon>
                    <SvgIcon type="mdi" :path="mdiPlus" />
                </template>
            </Button>
            <ProfileAvatar class="max-sm:hidden" />
            <SvgIcon type="mdi" :path="mdiMenu" class="cursor-pointer hover:bg-grays-light-100 sm:hidden" />
        </div>
    </div>
    <CreateTransactionDialog v-model:expenseType="expenseType" v-model:modalOpen="modalOpen" />
</template>
