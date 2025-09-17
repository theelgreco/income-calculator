<script setup lang="ts">
import { mdiCardsOutline, mdiClose, mdiCogOutline, mdiFinance, mdiHome, mdiHomeOutline, mdiMenu, mdiPlus, mdiPlusOutline } from "@mdi/js";
import { ref, watch } from "vue";
import Button from "primevue/button";
import SvgIcon from "@jamescoyle/vue-icon";
import CreateTransactionDialog from "./CreateTransactionDialog.vue";
import ProfileAvatar from "./ProfileAvatar.vue";
import Drawer from "primevue/drawer";
import { RouterLink, useRoute } from "vue-router";
import { useWindowSize } from "@vueuse/core";

const route = useRoute();

const expenseType = ref<"expense" | "income">("expense");

const modalOpen = ref(false);

const drawerVisible = ref(false);

const { width: windowWidth } = useWindowSize();

watch(
    () => route.path,
    () => {
        drawerVisible.value = false;
    }
);

watch(windowWidth, () => {
    if (windowWidth.value > 767) {
        drawerVisible.value = false;
    }
});
</script>

<template>
    <div class="flex h-[70px] justify-between items-center px-5 sm:px-10 py-5 gap-5 shadow-md bg-white z-50">
        <RouterLink :to="{ name: 'year', params: { year: new Date().getFullYear() } }">
            <div class="flex items-center gap-3 select-none cursor-pointer">
                <SvgIcon type="mdi" :path="mdiFinance" :size="36" />
                <h2 class="font-black">Income Tracker</h2>
            </div>
        </RouterLink>
        <div class="flex gap-5 items-center">
            <RouterLink :to="{ name: 'transactions' }" class="max-md:hidden">
                <Button label="Transactions">
                    <template #icon>
                        <SvgIcon type="mdi" :path="mdiCardsOutline" :size="16" />
                    </template>
                </Button>
            </RouterLink>
            <RouterLink :to="{ name: 'createTransaction' }" class="max-md:hidden">
                <Button label="Add transaction">
                    <template #icon>
                        <SvgIcon type="mdi" :path="mdiPlusOutline" :size="16" />
                    </template>
                </Button>
            </RouterLink>
            <ProfileAvatar />
            <SvgIcon type="mdi" :path="mdiMenu" class="cursor-pointer hover:bg-grays-light-100 md:hidden" @click="drawerVisible = true" />
        </div>
    </div>
    <Drawer
        v-if="windowWidth < 768"
        v-model:visible="drawerVisible"
        position="right"
        style="max-width: 100vw; padding: 1rem; gap: 0.25rem"
        blockScroll
    >
        <template #container="{ closeCallback }">
            <div class="flex justify-between">
                <RouterLink
                    :to="{ name: 'year', params: { year: new Date().getFullYear() } }"
                    class="flex items-center gap-2 select-none cursor-pointer"
                >
                    <SvgIcon type="mdi" :path="mdiFinance" :size="34" />
                    <h2 class="font-black">Income Tracker</h2>
                </RouterLink>
                <Button type="button" severity="text" @click="closeCallback" rounded class="-mr-2">
                    <template #icon>
                        <SvgIcon type="mdi" :path="mdiClose" />
                    </template>
                </Button>
            </div>
            <div class="flex flex-col py-3">
                <RouterLink
                    :to="{ name: 'year', params: { year: new Date().getFullYear() } }"
                    class="flex items-center gap-2 hover:bg-grays-light-100 p-3 rounded-sm transition-all select-none"
                >
                    <SvgIcon type="mdi" :path="mdiHomeOutline" :size="20" class="text-grays-light-500" />
                    <p>Dashboard</p>
                </RouterLink>
                <RouterLink
                    :to="{ name: 'transactions' }"
                    class="flex items-center gap-2 hover:bg-grays-light-100 p-3 rounded-sm transition-all select-none"
                >
                    <SvgIcon type="mdi" :path="mdiCardsOutline" :size="20" class="text-grays-light-500" />
                    <p>Transactions</p>
                </RouterLink>
                <RouterLink
                    :to="{ name: 'createTransaction' }"
                    class="flex items-center gap-2 hover:bg-grays-light-100 p-3 rounded-sm transition-all select-none"
                >
                    <SvgIcon type="mdi" :path="mdiPlusOutline" :size="20" class="text-grays-light-500" />
                    <p>Add transaction</p>
                </RouterLink>
                <RouterLink
                    :to="{ name: 'year', params: { year: new Date().getFullYear() } }"
                    class="flex items-center gap-2 hover:bg-grays-light-100 p-3 rounded-sm transition-all select-none"
                >
                    <SvgIcon type="mdi" :path="mdiCogOutline" :size="20" class="text-grays-light-500" />
                    <p>Settings</p>
                </RouterLink>
            </div>
            <div class="flex flex-col gap-6 mt-auto">
                <hr />
                <ProfileAvatar :isInDrawer="true" />
            </div>
        </template>
    </Drawer>
    <CreateTransactionDialog v-model:expenseType="expenseType" v-model:modalOpen="modalOpen" />
</template>
