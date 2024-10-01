<script setup lang="ts">
import { UsersApi, type User } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import { onMounted, ref } from "vue";
import Popover from "primevue/popover";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCog } from "@mdi/js";

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
        <img :src="user.image" />
        <Popover ref="popover">
            <div class="relative flex flex-col gap-5">
                <SvgIcon
                    type="mdi"
                    :path="mdiCog"
                    class="absolute right-0 top-0 cursor-pointer text-grays-light-400 hover:text-grays-light-600 transition-all"
                />
                <div class="w-[70px] h-[70px] mx-auto">
                    <img :src="user.image" class="outline outline-2 outline-purple-700 rounded-full" />
                </div>
                <div class="flex flex-col text-center">
                    <p class="font-medium">{{ user.username }}</p>
                    <p class="font-extralight">{{ user.email }}</p>
                </div>
                <Button label="Sign out" @click="logout"></Button>
            </div>
        </Popover>
    </div>
</template>
