<script setup lang="ts">
import { inject } from "vue";
import { motion } from "motion-v";
import { LoaderCircle } from "lucide-vue-next";
import type { FormContext } from "./Form.vue";

const form = inject<FormContext>("formContext");
</script>

<template>
    <div class="group relative w-full items-center">
        <slot />
        <motion.div
            v-if="form?.submitting.value"
            class="absolute end-0 inset-y-0 flex items-center justify-center px-3"
            :animate="{ rotate: 360, transition: { repeat: Infinity, duration: 1 } }"
        >
            <LoaderCircle />
        </motion.div>
    </div>
</template>
