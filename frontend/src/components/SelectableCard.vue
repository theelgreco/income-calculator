<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";

interface Props {
    icon: string;
    selectedValue: any;
    modelValue: any;
    label: string;
}

interface Emits {
    (event: "update:modelValue", value: any): void;
}

const emit = defineEmits<Emits>();

const props = defineProps<Props>();
</script>

<template>
    <div
        class="px-20 py-10 border-1 rounded-lg flex flex-col items-center cursor-pointer group"
        :class="{
            'bg-primary-100 border-primary-600': modelValue === selectedValue,
            'hover:bg-grays-light-100': modelValue !== selectedValue,
        }"
        @click="emit('update:modelValue', modelValue === selectedValue ? null : selectedValue)"
    >
        <SvgIcon
            type="mdi"
            :path="icon"
            :size="60"
            class="transition-all"
            :class="{
                'text-primary-600': modelValue === selectedValue,
                'text-grays-light-500 group-hover:text-grays-light-600': modelValue !== selectedValue,
            }"
        />
        <p
            class="transition-all"
            :class="{
                'text-primary-500': modelValue === selectedValue,
                'text-grays-light-400 group-hover:text-grays-light-600': modelValue !== selectedValue,
            }"
        >
            {{ label }}
        </p>
    </div>
</template>
