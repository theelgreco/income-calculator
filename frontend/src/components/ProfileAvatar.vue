<script setup lang="ts">
import { UsersApi, type User } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import { onMounted, ref } from "vue";

const usersApi = new UsersApi(defaultApiConfiguration);

const user = ref<User | null>(null);

async function getUser() {
    try {
        user.value = await usersApi.apiUserGet();
    } catch (err: any) {
        console.error(err);
    }
}

onMounted(() => {
    getUser();
});
</script>

<template>
    <div v-if="user"></div>
</template>
