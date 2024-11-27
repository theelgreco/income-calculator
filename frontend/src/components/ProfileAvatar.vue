<script setup lang="ts">
import { UsersApi, type User } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import { onMounted, ref, defineProps, withDefaults } from "vue";
import Popover from "primevue/popover";
import Button from "primevue/button";
import { useRouter } from "vue-router";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiCog, mdiLogout } from "@mdi/js";

interface Props {
    isInDrawer?: boolean;
}

const props = withDefaults(defineProps<Props>(), {
    isInDrawer: false,
});

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
        v-if="user && !isInDrawer"
        @click="(event) => popover.toggle(event)"
        class="w-[40px] h-[40px] rounded-full bg-grays-light-100 border-1 border-grays-light-400 cursor-pointer hover:bg-grays-light-200 max-md:hidden"
    >
        <img :src="user.image" />
        <Popover v-if="!isInDrawer" ref="popover">
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
    <div v-if="user && isInDrawer" class="flex w-full items-center gap-5">
        <!-- <SvgIcon
                type="mdi"
                :path="mdiCog"
                class="absolute right-0 top-0 cursor-pointer text-grays-light-400 hover:text-grays-light-600 transition-all"
            /> -->
        <RouterLink
            :to="{ name: 'transactions' }"
            class="flex items-center gap-3 overflow-hidden select-none hover:bg-grays-light-100 p-3 rounded transition-all"
        >
            <div class="min-w-[42px] min-h-[42px] w-[42px] h-[42px]">
                <img :src="user.image" class="outline outline-2 outline-purple-700 rounded-full w-full h-full" />
            </div>
            <div class="flex flex-col overflow-hidden">
                <p class="font-medium text-nowrap overflow-hidden text-ellipsis">{{ user.username }}</p>
                <p class="font-extralight text-nowrap overflow-hidden text-ellipsis">{{ user.email }}</p>
            </div>
        </RouterLink>
        <Button severity="plain" class="hover:bg-grays-light-100" @click="logout">
            <SvgIcon type="mdi" :path="mdiLogout" />
        </Button>
        <!-- <Button label="Sign out" @click="logout"></Button> -->
    </div>
</template>
