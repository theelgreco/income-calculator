<script setup lang="ts">
import LoginForm from "@/components/login/LoginForm.vue";
import LoginInfo from "@/components/login/LoginInfo.vue";
import { motion, type MotionProps } from "motion-v";

const containerMotions: MotionProps = {
    animate: {
        backgroundImage: [
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%), radial-gradient(#000000 0px, #ffffff 0px)",
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%), radial-gradient(#000000 2px, #ffffff 2px)",
            "linear-gradient(180deg, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 1) 10%, rgba(255, 255, 255, 1) 90%, rgba(255, 255, 255, 0) 100%), radial-gradient(#000000 1px, #ffffff 1px)",
        ],
    },
    transition: {
        duration: 1,
    },
};
</script>

<template>
    <motion.div v-bind="containerMotions" class="h-full flex justify-between bg-size-[100%,19px_19px]">
        <LoginInfo class="flex flex-col justify-center gap-5 max-lg:hidden w-1/2 h-full px-20" />
        <LoginForm
            class="md:bg-[#F8F8F8] md:border md:shadow-2xl flex flex-col justify-center w-full lg:w-1/2 sm:px-10 md:px-35 rounded-3xl md:min-w-[700px] max-w-[1000px]"
        />
    </motion.div>
</template>
