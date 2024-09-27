<script setup lang="ts">
import Calendar from "@/components/Calendar.vue";
import DatePicker from "primevue/datepicker";
import SvgIcon from "@jamescoyle/vue-icon";
import { mdiFinance, mdiPlus } from "@mdi/js";
import Button from "primevue/button";
import Dialog from "primevue/dialog";
import InputNumber from "primevue/inputnumber";
import InputText from "primevue/inputtext";
import { ref, watch } from "vue";
import Select from "primevue/select";
import { IncomeCalculatorApi, type TransactionCreateSerializer } from "@/api";

const api = new IncomeCalculatorApi();

const updateTrigger = ref(false);

const modalOpen = ref(false);

const daysOfWeek = ref([
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
]);

const daysOfMonth = ref([
    { label: "1st", value: 1 },
    { label: "2nd", value: 2 },
    { label: "3rd", value: 3 },
    { label: "4th", value: 4 },
    { label: "5th", value: 5 },
    { label: "6th", value: 6 },
    { label: "7th", value: 7 },
    { label: "8th", value: 8 },
    { label: "9th", value: 9 },
    { label: "10th", value: 10 },
    { label: "11th", value: 11 },
    { label: "12th", value: 12 },
    { label: "13th", value: 13 },
    { label: "14th", value: 14 },
    { label: "15th", value: 15 },
    { label: "16th", value: 16 },
    { label: "17th", value: 17 },
    { label: "18th", value: 18 },
    { label: "19th", value: 19 },
    { label: "20th", value: 20 },
    { label: "21st", value: 21 },
    { label: "22nd", value: 22 },
    { label: "23rd", value: 23 },
    { label: "24th", value: 24 },
    { label: "25th", value: 25 },
    { label: "26th", value: 26 },
    { label: "27th", value: 27 },
    { label: "28th", value: 28 },
]);

const firstLastDayOfMonthChoices = ref<{ label: string; value: "first_business" | "last_business" | "last" | "specific" }[]>([
    { label: "First business day of the month", value: "first_business" },
    { label: "Last business day of the month", value: "last_business" },
    { label: "Last day of the month", value: "last" },
    { label: "Specific day of the month (1st - 28th)", value: "specific" },
]);

const transactionForm = ref<TransactionCreateSerializer>({
    name: "",
    isExpense: null,
    amountInPence: null,
    startDate: null,
    finishDate: null,
    isRecurring: null,
    recurrenceType: null,
    recurrenceRate: null,
    recurrenceRateType: null,
    specificDayOfWeek: null,
    specificDayOfMonth: null,
    firstLastDayOfMonth: null,
});

function openModal() {
    modalOpen.value = true;
}

function closeModal() {
    modalOpen.value = false;
    resetTransactionForm();
}

function resetTransactionForm() {
    transactionForm.value = {
        name: "",
        isExpense: null,
        amountInPence: null,
        startDate: null,
        finishDate: null,
        isRecurring: null,
        recurrenceType: null,
        recurrenceRate: null,
        recurrenceRateType: null,
        specificDayOfWeek: null,
        specificDayOfMonth: null,
        firstLastDayOfMonth: null,
    };
}

async function createTransaction() {
    try {
        await api.transactionCreate(transactionForm.value);
        updateTrigger.value = true;
        closeModal();
    } catch (err: any) {
        console.error(err);
    }
}

watch(
    () => transactionForm.value.recurrenceType,
    () => {
        transactionForm.value.recurrenceRate = null;
        transactionForm.value.recurrenceRate = null;
        transactionForm.value.recurrenceRateType = null;
        transactionForm.value.specificDayOfWeek = null;
        transactionForm.value.specificDayOfMonth = null;
        transactionForm.value.firstLastDayOfMonth = null;
    }
);
</script>

<template>
    <main class="w-full h-full flex flex-col gap-5 overscroll-none">
        <div class="flex h-[70px] justify-between items-center px-10 py-5 gap-5 shadow-md sticky top-0 bg-white z-50">
            <div class="flex items-center gap-3">
                <SvgIcon type="mdi" :path="mdiFinance" />
                <h2 class="font-medium">Income Tracker</h2>
            </div>
            <div class="flex gap-5">
                <Button label="Add expense">
                    <template #icon>
                        <SvgIcon type="mdi" :path="mdiPlus" />
                    </template>
                </Button>
                <Button label="Add income">
                    <template #icon>
                        <SvgIcon type="mdi" :path="mdiPlus" />
                    </template>
                </Button>
            </div>
        </div>
        <Calendar v-model:updateTrigger="updateTrigger" class="px-10" />
        <!-- <div class="flex w-full fixed bottom-0 left-0">
            <Button class="rounded-full !bg-black text-white shadow-lg ml-2 mb-2" @click="openModal">
                <SvgIcon type="mdi" :path="mdiPlus" />
            </Button>
        </div> -->
    </main>
    <Dialog
        v-model:visible="modalOpen"
        modal
        :draggable="false"
        header="Add a new transaction"
        @hide="closeModal"
        :pt="{ headerActions: 'self-start' }"
    >
        <template v-slot:header>
            <div class="flex flex-col gap-2">
                <h1 class="text-2xl font-medium">Choose transaction type</h1>
            </div>
        </template>
        <div class="flex flex-col justify-between mt-3 gap-12">
            <InputText v-model="transactionForm.name" placeholder="Name of transaction" />
            <!-- Transaction Type -->
            <div class="flex w-full gap-3">
                <Button
                    class="flex-grow w-[50%] hover:opacity-100"
                    :class="{ 'bg-black text-white': transactionForm.isExpense === false, 'opacity-50': transactionForm.isExpense }"
                    severity="secondary"
                    label="Income"
                    @click="transactionForm.isExpense = false"
                ></Button>
                <Button
                    class="flex-grow w-[50%] hover:opacity-100"
                    :class="{ 'bg-black text-white': transactionForm.isExpense, 'opacity-50': transactionForm.isExpense === false }"
                    severity="secondary"
                    label="Expense"
                    @click="transactionForm.isExpense = true"
                ></Button>
            </div>
            <!-- One Off -->
            <div v-if="transactionForm.isExpense !== null" class="flex w-full gap-3">
                <Button
                    class="flex-grow w-[50%] hover:opacity-100"
                    :class="{ 'bg-black text-white': transactionForm.isRecurring === false, 'opacity-50': transactionForm.isRecurring }"
                    severity="secondary"
                    label="One off"
                    @click="transactionForm.isRecurring = false"
                ></Button>
                <Button
                    class="flex-grow w-[50%] hover:opacity-100"
                    :class="{ 'bg-black text-white': transactionForm.isRecurring, 'opacity-50': transactionForm.isRecurring === false }"
                    severity="secondary"
                    label="Recurring"
                    @click="transactionForm.isRecurring = true"
                ></Button>
            </div>
            <!-- Recurring -->
            <template v-if="transactionForm.isRecurring !== null && transactionForm.isRecurring">
                <div class="flex flex-col gap-3 border-1 p-5 rounded-lg">
                    <div class="flex justify-between gap-3">
                        <Button
                            class="flex-grow hover:opacity-100"
                            :class="{
                                '!bg-black !text-white': transactionForm.recurrenceType === 'day',
                                'opacity-50': transactionForm.recurrenceType !== 'day' && transactionForm.recurrenceType,
                            }"
                            severity="secondary"
                            label="Day"
                            @click="transactionForm.recurrenceType = 'day'"
                        />
                        <Button
                            class="flex-grow hover:opacity-100"
                            :class="{
                                '!bg-black !text-white': transactionForm.recurrenceType === 'week',
                                'opacity-50': transactionForm.recurrenceType !== 'week' && transactionForm.recurrenceType,
                            }"
                            severity="secondary"
                            label="Week"
                            @click="transactionForm.recurrenceType = 'week'"
                        />
                        <Button
                            class="flex-grow hover:opacity-100"
                            :class="{
                                '!bg-black !text-white': transactionForm.recurrenceType === 'month',
                                'opacity-50': transactionForm.recurrenceType !== 'month' && transactionForm.recurrenceType,
                            }"
                            severity="secondary"
                            label="Month"
                            @click="transactionForm.recurrenceType = 'month'"
                        />
                    </div>
                    <div v-if="transactionForm.recurrenceType === 'day'" class="flex flex-col flex-grow gap-3">
                        <InputNumber v-model="transactionForm.recurrenceRate" placeholder="Every how many days?" :min="1" />
                        <p v-if="transactionForm.recurrenceRate !== null">
                            Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> days
                        </p>
                    </div>
                    <div v-else-if="transactionForm.recurrenceType === 'week'" class="flex flex-col gap-3 w-full">
                        <InputNumber v-model="transactionForm.recurrenceRate" placeholder="Every how many weeks?" :min="1" />
                        <Select
                            v-model="transactionForm.specificDayOfWeek"
                            :options="daysOfWeek"
                            placeholder="Select a day of the week"
                            optionLabel="label"
                            optionValue="value"
                        />
                        <p v-if="transactionForm.specificDayOfWeek !== null && transactionForm.recurrenceRate !== null">
                            Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> weeks on
                            <b>{{ daysOfWeek[transactionForm.specificDayOfWeek].label }}</b>
                        </p>
                    </div>
                    <div v-else-if="transactionForm.recurrenceType === 'month'" class="flex flex-col gap-3 w-full">
                        <InputNumber v-model="transactionForm.recurrenceRate" placeholder="Every how many months?" :min="1" />
                        <Select
                            v-model="transactionForm.firstLastDayOfMonth"
                            :options="firstLastDayOfMonthChoices"
                            placeholder="on which day?"
                            optionLabel="label"
                            optionValue="value"
                        />
                        <template v-if="transactionForm.firstLastDayOfMonth === 'specific'">
                            <Select
                                v-model="transactionForm.specificDayOfMonth"
                                :options="daysOfMonth"
                                optionLabel="label"
                                optionValue="value"
                                placeholder="Select a day of the month"
                            />
                            <p v-if="transactionForm.specificDayOfMonth !== null && transactionForm.recurrenceRate !== null">
                                Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> months on the
                                <b>{{ daysOfMonth[transactionForm.specificDayOfMonth - 1].label }}</b>
                            </p>
                        </template>
                        <p v-else-if="transactionForm.recurrenceRate !== null && transactionForm.firstLastDayOfMonth !== null">
                            Payment occurs every <b>{{ transactionForm.recurrenceRate }}</b> months on the
                            <b>{{
                                firstLastDayOfMonthChoices
                                    .find((el) => el.value === transactionForm.firstLastDayOfMonth)
                                    ?.label.toLowerCase()
                            }}</b>
                        </p>
                    </div>
                </div>
                <div class="flex flex-col gap-5">
                    <DatePicker v-model="transactionForm.startDate" placeholder="Start Date (optional)" showIcon iconDisplay="input" />
                    <DatePicker v-model="transactionForm.finishDate" placeholder="Finish Date (optional)" showIcon iconDisplay="input" />
                </div>
                <InputNumber
                    v-model="transactionForm.amountInPence"
                    placeholder="Value of the payment (£)"
                    mode="currency"
                    currency="GBP"
                    locale="en-GB"
                    :min="0.01"
                />
                <div class="flex justify-between w-full">
                    <Button severity="secondary" label="Cancel" @click="closeModal" />
                    <Button label="Create" @click="createTransaction" />
                </div>
            </template>
        </div>
    </Dialog>
</template>
