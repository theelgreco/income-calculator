<script setup lang="ts">
import { inject } from "vue";
import type { FormContext } from "./Form.vue";
import type { FormFieldGroupProps } from "./FormFieldGroup.vue";

const { errors } = inject<FormContext>("formContext")!;

const field = inject<FormFieldGroupProps["field"]>("fieldContext")!;
</script>

<template>
    <small role="alert" class="text-destructive">
        {{ errors?.fieldErrors?.[field]?.[0] }}
    </small>
</template>
