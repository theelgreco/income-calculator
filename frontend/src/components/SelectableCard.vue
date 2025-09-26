<script setup lang="ts">
import SvgIcon from "@jamescoyle/vue-icon";

interface Props {
    icon: string;
    selectedValue: any;
    deselectValue?: any;
    modelValue: any;
    label: string;
}

interface Emits {
    (event: "update:modelValue", value: any): void;
}

const emit = defineEmits<Emits>();

const props = withDefaults(defineProps<Props>(), {
    deselectValue: null,
});
</script>

<template>
    <button
        class="px-20! py-10! border-1 rounded-lg flex flex-col items-center cursor-pointer group"
        :class="{
            'bg-blue-100 hover:bg-blue-200 border-blue-600!': modelValue === selectedValue,
            'hover:bg-gray-100': modelValue !== selectedValue,
        }"
        @click="emit('update:modelValue', modelValue === selectedValue ? deselectValue : selectedValue)"
    >
        <SvgIcon
            type="mdi"
            :path="icon"
            :size="60"
            class="transition-all"
            :class="{
                'text-blue-600': modelValue === selectedValue,
                'text-gray-500 group-hover:text-gray-600': modelValue !== selectedValue,
            }"
        />
        <p
            class="transition-all"
            :class="{
                'text-blue-500': modelValue === selectedValue,
                'text-gray-400 group-hover:text-gray-600': modelValue !== selectedValue,
            }"
        >
            {{ label }}
        </p>
    </button>
</template>
