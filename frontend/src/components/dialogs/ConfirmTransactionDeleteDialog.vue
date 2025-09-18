<script setup lang="ts">
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Button from "../ui/button/Button.vue";
import { ref, defineExpose } from "vue";

const open = ref(false);

interface Props {
    onClose?: () => any;
}

interface Emits {
    (event: "confirm", value: boolean): void;
}

withDefaults(defineProps<Props>(), {
    onClose: () => {},
});

const emit = defineEmits<Emits>();

defineExpose({
    open,
});
</script>

<template>
    <AlertDialog
        v-if="open"
        v-model:open="open"
        @update:open="
            (open) => {
                if (!open) {
                    onClose();
                }
            }
        "
    >
        <AlertDialogContent>
            <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete this transaction.
                </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
                <AlertDialogCancel asChild>
                    <Button variant="secondary">Cancel</Button>
                </AlertDialogCancel>
                <AlertDialogAction asChild>
                    <Button @click="emit('confirm', true)">Continue</Button>
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
</template>
