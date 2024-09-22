<script setup lang="ts">
import Calendar from "@/components/Calendar.vue";
import DatePicker from "primevue/datepicker";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiPlus } from "@mdi/js";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import { ref } from "vue";
import Select from "primevue/select";

interface TypeOption {
    label: string;
    value: boolean;
}

const modalOpen = ref(true);

const typeOptions = ref<TypeOption[]>([
    { label: "Income", value: false },
    { label: "Expense", value: true },
]);

const selectedType = ref<TypeOption["value"] | null>(null);

const startTime = ref<Date | null>(null);

const finishTime = ref<Date | null>(null);

const amount = ref<number>(0.0);

const frequency = ref<number | null>(null);

function openModal() {
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
}

// isExpense
// startTime
// finishTime
// amount_in_pence
// frequency_interval_in_days
</script>

<template>
    <main class="px-10 py-6 w-full h-full flex">
        <Calendar />
        <div class="flex w-full fixed bottom-0 left-0">
            <Button class="rounded-full bg-black text-white shadow-lg ml-2 mb-2">
                <SvgIcon type="mdi" :path="mdiPlus" />
            </Button>
        </div>
    </main>
    <Dialog v-model:visible="modalOpen" modal :draggable="false" header="Add a new transaction">
        <div class="w-full flex flex-col gap-8 mt-3">
            <div class="flex flex-col gap-2">
                <label class="w-fit" for="type">Transaction type</label>
                <Select id="type" v-model="selectedType" :options="typeOptions" optionLabel="label" optionValue="value"></Select>
            </div>
            <div class="flex flex-col gap-2">
                <label class="w-fit" for="start">Start Date</label>
                <DatePicker v-model="startTime" inputId="start" placeholder="Select a date" showIcon iconDisplay="input" />
            </div>
            <div class="flex flex-col gap-2">
                <label class="w-fit" for="finish">Finish Date</label>
                <DatePicker v-model="finishTime" inputId="finish" placeholder="Select a date" showIcon iconDisplay="input" />
            </div>
            <div class="flex flex-col gap-2">
                <label class="w-fit" for="amount">Amount (£)</label>
                <InputNumber
                    v-model="amount"
                    inputId="amount"
                    placeholder="Select a number"
                    mode="currency"
                    currency="GBP"
                    locale="en-GB"
                />
            </div>
            <div class="flex flex-col gap-2">
                <label class="w-fit" for="frequency">Payment frequency (days)</label>
                <InputNumber v-model="frequency" inputId="frequency" placeholder="Select a number" :min="1" />
            </div>
        </div>
    </Dialog>
</template>
