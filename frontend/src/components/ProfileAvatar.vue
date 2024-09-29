<script setup lang="ts">
import { UsersApi, type User } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import { onMounted, ref } from "vue";
import Popover from "primevue/popover";
import Button from "primevue/button";
import { useRouter } from "vue-router";

const router = useRouter();

const usersApi = new UsersApi(defaultApiConfiguration);

const user = ref<User | null>(null);

const popover = ref();

async function getUser() {
    try {
        user.value = await usersApi.apiUserGet();
    } catch (err: any) {
        console.error(err);
    }
}

function logout() {
    localStorage.removeItem("jwt");
    router.replace({ name: "login" });
}

onMounted(() => {
    getUser();
});
</script>

<template>
    <div
        v-if="user"
        @click="(event) => popover.toggle(event)"
        class="w-[40px] h-[40px] rounded-full bg-grays-light-100 border-1 border-grays-light-400 cursor-pointer hover:bg-grays-light-200"
    >
        <Popover ref="popover">
            <div class="flex flex-col gap-5">
                <p>{{ user?.email }}</p>
                <Button label="Sign out" @click="logout"></Button>
            </div>
        </Popover>
    </div>
</template>
