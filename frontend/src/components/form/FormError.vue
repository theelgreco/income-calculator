<script setup lang="ts">
import { inject } from "vue";
import type { FormContext } from "./Form.vue";
import { XCircle } from "lucide-vue-next";
import { motion } from "motion-v";

const form = inject<FormContext>("formContext");
</script>

<template>
    <motion.div
        :drag="true"
        :initial="{ transform: 'translateX(-100%)' }"
        :animate="{ transform: 'translateX(0%)' }"
        v-if="form?.error.value"
        class="p-2 flex items-center gap-2 border bg-destructive/10 border-destructive/30! text-destructive"
    >
        <XCircle :size="15" />
        <small>{{ form.error.value }}</small>
    </motion.div>
</template>
