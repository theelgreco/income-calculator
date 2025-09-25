<script setup lang="ts">
import { onMounted } from "vue";
import { useUserStore } from "@/stores/userStore";
import { useRoute } from "vue-router";
import LoginForm from "@/components/login/LoginForm.vue";

const route = useRoute();

const { signInWithGoogle } = useUserStore();

onMounted(() => {
    const urlParams = new URLSearchParams(route.hash.replace("#", ""));
    const googleAccessToken = urlParams.get("access_token");

    if (googleAccessToken) {
        signInWithGoogle(googleAccessToken);
    }
});
</script>

<template>
    <div class="h-full flex bg-gradient-to-tr from-yellow-50 to-white to-40%">
        <div class="flex flex-col gap-5 max-lg:hidden w-1/2 my-60 mx-20">
            <div class="flex flex-wrap items-center gap-5">
                <img class="bg-white border rounded-full p-5 shadow-lg w-[100px] h-[100px]" src="/192w/icon.png" />
                <div>
                    <h1 class="font-black text-3xl">Take control of your finances today</h1>
                    <h2 class="text-lg font-light">One <i class="font-bold">simple</i> transaction at a time</h2>
                </div>
            </div>
            <!-- <div class="w-full border h-full"></div> -->
        </div>
        <div
            class="md:bg-[#F8F8F8] md:border md:shadow-2xl flex flex-col justify-center w-full lg:w-1/2 sm:px-10 md:px-35 rounded-3xl md:min-w-[700px]"
        >
            <LoginForm />
        </div>
    </div>
</template>
