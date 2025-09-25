<script setup lang="ts">
import { inject } from "vue";
import type { FormContext } from "./Form.vue";
import { XCircle } from "lucide-vue-next";
import { motion } from "motion-v";

const form = inject<FormContext>("formContext");
</script>

<template>
    <div v-if="form?.error.value" class="relative w-full h-[40px] overflow-hidden">
        <motion.div
            :drag="true"
            :initial="{ left: '-200%', opacity: 0 }"
            :animate="{ left: '0', opacity: 1 }"
            class="absolute w-full h-full t-0 p-2 flex items-center gap-2 border bg-destructive/10 border-destructive/30! text-destructive"
            role="alert"
        >
            <XCircle :size="15" />
            <small class="ellipsis">{{ form.error.value }}</small>
        </motion.div>
    </div>
</template>
