<script setup lang="ts">
import { mdiCardsOutline, mdiFinance, mdiMenu, mdiPlusOutline } from "@mdi/js";
import SvgIcon from "@jamescoyle/vue-icon";
import { RouterLink } from "vue-router";
</script>

<template>
    <nav class="flex h-[70px] justify-between items-center px-5 sm:px-10 py-5 gap-5 shadow-md bg-white z-50">
        <RouterLink :to="{ name: 'year', params: { year: new Date().getFullYear() } }">
            <div class="flex items-center gap-3 select-none cursor-pointer">
                <SvgIcon type="mdi" :path="mdiFinance" :size="36" />
                <h2 class="font-black">Fidelio</h2>
            </div>
        </RouterLink>
        <div class="flex gap-5 items-center">
            <Button as-child>
                <RouterLink :to="{ name: 'transactions' }" class="max-md:hidden">
                    <span>Transactions</span>
                    <SvgIcon type="mdi" :path="mdiCardsOutline" :size="16" />
                </RouterLink>
            </Button>
            <Button as-child>
                <RouterLink :to="{ name: 'createTransaction' }" class="max-md:hidden">
                    <span>Add transaction</span>
                    <SvgIcon type="mdi" :path="mdiPlusOutline" :size="16" />
                </RouterLink>
            </Button>
            <CurrencySelect />
            <ProfileAvatar class="max-md:hidden" />
            <SidebarTrigger class="cursor-pointer md:hidden">
                <SvgIcon type="mdi" :path="mdiMenu" />
            </SidebarTrigger>
        </div>
    </nav>
</template>
