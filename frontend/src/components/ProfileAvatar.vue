<script setup lang="ts">
import Button from "./ui/button/Button.vue";
import { ChevronUp } from "lucide-vue-next";
import { useUserStore } from "@/stores/userStore";
import { storeToRefs } from "pinia";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu";

const userStore = useUserStore();

const { logout } = userStore;

const { user } = storeToRefs(userStore);
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="outline" v-bind="$attrs">
                <img :src="user?.image" class="max-h-full" />
                {{ user?.username }}
                <ChevronUp class="ml-auto" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent side="top" class="w-full!">
            <DropdownMenuItem>
                <span>Account</span>
            </DropdownMenuItem>
            <DropdownMenuItem @click="() => logout()">
                <span>Sign out</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
