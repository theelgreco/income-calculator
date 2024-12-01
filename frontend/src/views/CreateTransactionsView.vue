<script setup lang="ts">
import Button from "primevue/button";
import { usePreviousRoute } from "@/composables/previousRoute";
import { computed, onMounted, ref, watch } from "vue";
import SvgIcon from "@jamescoyle/vue-icon";
import {
    mdiArrowLeft,
    mdiArrowRight,
    mdiAutorenew,
    mdiCalendarMonthOutline,
    mdiCalendarTodayOutline,
    mdiCalendarWeekOutline,
    mdiCashMinus,
    mdiCashPlus,
    mdiCheckboxBlankCircleOutline,
} from "@mdi/js";
import { RouterLink } from "vue-router";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import DatePicker from "primevue/datepicker";
import SelectableCard from "@/components/SelectableCard.vue";
import Select from "primevue/select";
import { useScroll, useResizeObserver, useWindowSize } from "@vueuse/core";

type FirstLastDayOfMonth = "first_business" | "last_business" | "last" | "specific";

const { width: windowWidth } = useWindowSize();

const previousRoute = usePreviousRoute();

const boxes = ref();

const boxesHasOverflow = ref(false);

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

const firstLastDayOfMonthChoices = ref<{ label: string; value: FirstLastDayOfMonth }[]>([
    { label: "First business day of the month", value: "first_business" },
    { label: "Last business day of the month", value: "last_business" },
    { label: "Last day of the month", value: "last" },
    { label: "Specific day of the month (1st - 28th)", value: "specific" },
]);

const step = ref(1);

const isExpense = ref<boolean | null>(null);

const transactionName = ref("");

const recurrenceType = ref<"day" | "week" | "month" | null>(null);

const isRecurring = ref<boolean | null>(null);

const amountInPence = ref<number | null>(null);

const recurrenceRate = ref<number | null>(null);

const specificDayOfWeek = ref<number | null>(null);

const firstLastDayOfMonth = ref<FirstLastDayOfMonth | null>(null);

const specificDayOfMonth = ref<number | null>(null);

const startDate = ref<Date | null>(null);

const finishDate = ref<Date | null>(null);

const disabled = computed(() => {
    if (step.value === 1) {
        return isExpense.value === null;
    } else if (step.value === 2) {
        return !transactionName.value;
    } else if (step.value === 3) {
        return isRecurring.value === null;
    } else if (step.value === 4) {
        return !amountInPence.value;
    } else if (step.value === 5) {
        if (isRecurring.value === false) {
            return !startDate.value;
        } else if (isRecurring.value === true) {
            if (recurrenceType.value === null || !recurrenceRate.value) {
                return true;
            } else if (recurrenceType.value === "week") {
                return specificDayOfWeek.value === null;
            } else if (recurrenceType.value === "month") {
                if (firstLastDayOfMonth.value === null) {
                    return true;
                } else {
                    return firstLastDayOfMonth.value === "specific" && specificDayOfMonth.value === null;
                }
            }
        }
    }
});

const exitLink = computed(() => {
    if (previousRoute.value) {
        return { name: previousRoute.value.name, params: previousRoute.value.params };
    }

    return { name: "home", params: {} };
});

const { arrivedState: boxesArrivedState } = useScroll(boxes);

useResizeObserver(boxes, (entries) => {
    const entry = entries[0];

    boxesHasOverflow.value = entry.target.scrollWidth > entry.target.clientWidth;
    boxesArrivedState.left = entry.target.scrollLeft === 0;
    boxesArrivedState.right = entry.target.scrollLeft === entry.target.scrollWidth;
});
</script>

<template>
    <div class="h-full flex flex-col overflow-hidden" :class="{ 'slide-in': previousRoute }">
        <div class="w-full h-full max-h-full max-w-full overflow-y-auto flex flex-col items-center justify-start gap-10 py-10">
            <!-- Step Header -->
            <div class="text-center py-0 px-8 sm:px-16">
                <!-- STEP 1 -->
                <template v-if="step === 1">
                    <h1 class="text-2xl font-bold">What type of transaction is this?</h1>
                    <h2 class="font-extralight">Select whether this is an expense or an income</h2>
                </template>

                <!-- STEP 2 -->
                <template v-if="step === 2">
                    <h1 class="text-2xl font-bold">What is the name of this transaction?</h1>
                    <h2 class="font-extralight">Select a descriptive name for this transaction</h2>
                </template>

                <!-- STEP 3 -->
                <template v-if="step === 3">
                    <h1 class="text-2xl font-bold">What is the recurrence type of this transaction?</h1>
                    <h2 class="font-extralight">Select if this is a one-off or a recurring transaction</h2>
                </template>

                <!-- STEP 4 -->
                <template v-if="step === 4">
                    <h1 class="text-2xl font-bold">What is the monetary value of this transaction?</h1>
                    <h2 class="font-extralight">Enter the amount of money that this transaction is worth</h2>
                </template>

                <!-- STEP 5 -->
                <template v-if="step === 5">
                    <template v-if="isRecurring === false">
                        <h1 class="text-2xl font-bold">What is the date of this transaction?</h1>
                        <h2 class="font-extralight">Select the date that this transaction will occur or has occurred on</h2>
                    </template>
                    <template v-else-if="isRecurring === true">
                        <h1 class="text-2xl font-bold">When does this transaction occur?</h1>
                        <h2 class="font-extralight">
                            Select the frequency type, frequency interval and optionally the start and finish dates of this transaction
                        </h2>
                    </template>
                </template>

                <!-- STEP 6 -->
                <template v-if="step === 6">
                    <h1 class="text-2xl font-bold">Transaction summary</h1>
                    <h2 class="font-extralight">Here are the details of the new transaction. Click 'submit' if it all looks good</h2>
                </template>
            </div>

            <!-- Step Content -->
            <div class="flex flex-wrap items-center justify-center gap-16 w-full py-0 px-8 sm:px-16">
                <!-- STEP 1 -->
                <template v-if="step === 1">
                    <SelectableCard :selectedValue="true" v-model="isExpense" label="Expense" :icon="mdiCashMinus" />
                    <SelectableCard :selectedValue="false" v-model="isExpense" label="Income" :icon="mdiCashPlus" />
                </template>

                <!-- STEP 2 -->
                <template v-if="step === 2">
                    <InputText
                        v-model="transactionName"
                        autofocus="true"
                        class="w-[300px] max-w-full"
                        :placeholder="!isExpense ? `e.g. Salary` : `e.g. Rent or Phone bill`"
                    />
                </template>

                <!-- STEP 3 -->
                <template v-if="step === 3">
                    <SelectableCard :selectedValue="false" v-model="isRecurring" label="One off" :icon="mdiCheckboxBlankCircleOutline" />
                    <SelectableCard :selectedValue="true" v-model="isRecurring" label="Recurring" :icon="mdiAutorenew" />
                </template>

                <!-- STEP 4 -->
                <template v-if="step === 4">
                    <InputNumber
                        :modelValue="amountInPence"
                        placeholder="e.g. 10.00"
                        @vue:mounted="(e) => e.el.children[0].focus()"
                        mode="currency"
                        currency="GBP"
                        @input="(e) => (amountInPence = e.value)"
                    />
                </template>

                <!-- STEP 5 -->
                <template v-if="step === 5">
                    <!-- ONE-OFF -->
                    <template v-if="isRecurring === false">
                        <div class="flex flex-col gap-1">
                            <label class="font-extralight text-sm text-grays-light-500" for="startDate">Transaction date</label>
                            <DatePicker
                                v-model="startDate"
                                placeholder="Select a date"
                                showIcon
                                inputId="startDate"
                                iconDisplay="input"
                                class="w-[300px] max-w-full"
                                showButtonBar
                                dateFormat="dd MM yy"
                            />
                        </div>
                    </template>
                    <!-- RECURRING -->
                    <template v-else-if="isRecurring === true">
                        <div class="flex flex-col gap-16 w-fit max-w-full">
                            <!-- Frequency Type (Day, Month, Year) -->
                            <div class="flex flex-col gap-4">
                                <div class="flex flex-col">
                                    <p class="font-medium">1. Frequency type</p>
                                    <p class="font-extralight">How frequently does the transaction occur?</p>
                                </div>
                                <hr />
                                <div
                                    ref="boxes"
                                    class="flex gap-3 overflow-x-auto max-w-full boxes"
                                    :class="{
                                        'shadow-right': !boxesArrivedState.right && boxesArrivedState.left && boxesHasOverflow,
                                        'shadow-left': !boxesArrivedState.left && boxesArrivedState.right && boxesHasOverflow,
                                        'shadow-both': !boxesArrivedState.right && !boxesArrivedState.left && boxesHasOverflow,
                                    }"
                                >
                                    <SelectableCard
                                        v-model="recurrenceType"
                                        label="Daily"
                                        selectedValue="day"
                                        :icon="mdiCalendarTodayOutline"
                                        class="max-sm:px-12 max-sm:py-6"
                                    />
                                    <SelectableCard
                                        v-model="recurrenceType"
                                        label="Weekly"
                                        selectedValue="week"
                                        :icon="mdiCalendarWeekOutline"
                                        class="max-sm:px-12 max-sm:py-6"
                                    />
                                    <SelectableCard
                                        v-model="recurrenceType"
                                        label="Monthly"
                                        selectedValue="month"
                                        :icon="mdiCalendarMonthOutline"
                                        class="max-sm:px-12 max-sm:py-6"
                                    />
                                </div>
                            </div>
                            <!-- Frequency Rate (Every X frequency types) -->
                            <div
                                class="flex flex-col gap-4 transition-all"
                                :class="{ 'opacity-30 select-none pointer-events-none': !recurrenceType }"
                            >
                                <div class="flex flex-col">
                                    <p class="font-medium">2. Frequency rate</p>
                                    <p class="font-extralight">Every how many {{ recurrenceType }}s does this transaction occur?</p>
                                </div>
                                <hr />
                                <div class="flex flex-col gap-8 p-4 w-full">
                                    <div class="flex flex-col gap-1 mx-auto w-full">
                                        <label class="w-fit font-extralight text-sm text-grays-light-500" for="frequencyRate">
                                            Enter a number
                                        </label>
                                        <InputNumber
                                            :modelValue="recurrenceRate"
                                            inputId="frequencyRate"
                                            :min="1"
                                            placeholder="e.g. 7"
                                            @input="(e) => (recurrenceRate = e.value ? e.value : 1)"
                                        />
                                        <small v-if="recurrenceRate">
                                            Every {{ recurrenceRate > 1 ? `${recurrenceRate} ${recurrenceType}s` : `${recurrenceType}` }}
                                        </small>
                                    </div>
                                    <div v-if="recurrenceType === 'week'" class="flex flex-col gap-1">
                                        <label class="w-fit font-extralight text-sm text-grays-light-500" for="specificDayOfWeek">
                                            Select a day of the week
                                        </label>
                                        <Select
                                            v-model="specificDayOfWeek"
                                            :options="daysOfWeek"
                                            optionLabel="label"
                                            optionValue="value"
                                            inputId="specificDayOfWeek"
                                            class="w-full"
                                        />
                                        <small v-if="recurrenceRate && specificDayOfWeek !== null">
                                            Every {{ recurrenceRate > 1 ? `${recurrenceRate} ${recurrenceType}s` : `${recurrenceType}` }} on
                                            <span class="capitalize">{{ daysOfWeek[specificDayOfWeek].label }}</span>
                                        </small>
                                    </div>
                                    <template v-if="recurrenceType === 'month'">
                                        <div class="flex flex-col gap-1">
                                            <label class="w-fit font-extralight text-sm text-grays-light-500" for="firstLastDayOfMonth">
                                                On which day?
                                            </label>
                                            <Select
                                                v-model="firstLastDayOfMonth"
                                                :options="firstLastDayOfMonthChoices"
                                                optionLabel="label"
                                                optionValue="value"
                                                inputId="firstLastDayOfMonth"
                                                class="w-full"
                                            />
                                            <small
                                                v-if="recurrenceRate && firstLastDayOfMonth !== null && firstLastDayOfMonth !== 'specific'"
                                            >
                                                Every
                                                {{ recurrenceRate > 1 ? `${recurrenceRate} ${recurrenceType}s` : `${recurrenceType}` }} on
                                                the
                                                <span class="lowercase">
                                                    {{ firstLastDayOfMonthChoices.find((el) => el.value === firstLastDayOfMonth)?.label }}
                                                </span>
                                            </small>
                                        </div>
                                        <div v-if="firstLastDayOfMonth === 'specific'" class="flex flex-col gap-1">
                                            <label class="w-fit font-extralight text-sm text-grays-light-500" for="specificDayOfMonth">
                                                Select a day
                                            </label>
                                            <Select
                                                v-model="specificDayOfMonth"
                                                :options="daysOfMonth"
                                                optionLabel="label"
                                                optionValue="value"
                                                inputId="specificDayOfMonth"
                                                class="w-full"
                                            />
                                            <small
                                                v-if="recurrenceRate && specificDayOfMonth !== null && firstLastDayOfMonth === 'specific'"
                                            >
                                                Every
                                                {{ recurrenceRate > 1 ? `${recurrenceRate} ${recurrenceType}s` : `${recurrenceType}` }} on
                                                the
                                                <span class="lowercase">
                                                    {{ daysOfMonth.find((el) => el.value === specificDayOfMonth)?.label }}
                                                </span>
                                            </small>
                                        </div>
                                    </template>
                                </div>
                            </div>
                            <!-- Transaction Dates (Start Date, Finish Date) -->
                            <div
                                class="flex flex-col gap-4 transition-all"
                                :class="{ 'opacity-30 select-none pointer-events-none': !recurrenceType }"
                            >
                                <div class="flex flex-col">
                                    <p class="font-medium">3. Transaction dates (optional)</p>
                                    <p class="font-extralight">Does the transaction have a start date or a finish date?</p>
                                </div>
                                <hr />
                                <div class="flex flex-col gap-5 p-4 w-full">
                                    <div class="flex flex-col gap-1 mx-auto w-full">
                                        <label class="w-fit font-extralight text-sm text-grays-light-500" for="startDate">Start date</label>
                                        <DatePicker
                                            v-model="startDate"
                                            placeholder="Select a start date (optional)"
                                            showIcon
                                            inputId="startDate"
                                            iconDisplay="input"
                                            showButtonBar
                                            dateFormat="dd MM yy"
                                        />
                                    </div>
                                    <div class="flex flex-col gap-1 mx-auto w-full">
                                        <label class="w-fit font-extralight text-sm text-grays-light-500" for="finishDate"
                                            >Finish date</label
                                        >
                                        <DatePicker
                                            v-model="finishDate"
                                            :minDate="startDate"
                                            placeholder="Select a finish date (optional)"
                                            showIcon
                                            inputId="finishDate"
                                            iconDisplay="input"
                                            showButtonBar
                                            dateFormat="dd MM yy"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </template>

                <!-- STEP 6 -->
                <template v-if="step === 6">
                    <div class="border-1 flex flex-col p-8 w-full max-w-[420px] rounded gap-6">
                        <div class="flex w-full justify-between">
                            <p class="font-extralight">Name</p>
                            <p class="font-medium">{{ transactionName }}</p>
                        </div>
                        <div class="flex w-full justify-between">
                            <p class="font-extralight">Type</p>
                            <p class="font-medium">{{ isExpense ? "Expense" : "Income" }}</p>
                        </div>
                        <div class="flex w-full justify-between">
                            <p class="font-extralight">Amount</p>
                            <p class="font-medium">£{{ amountInPence }}</p>
                        </div>
                        <div class="flex w-full justify-between">
                            <p class="font-extralight">Recurrence type</p>
                            <p class="font-medium">{{ isRecurring ? "Recurring" : "One-off" }}</p>
                        </div>
                        <template v-if="!isRecurring">
                            <div class="flex w-full justify-between">
                                <p class="font-extralight">Date</p>
                                <p class="font-medium">{{ startDate?.toDateString() }}</p>
                            </div>
                        </template>
                        <template v-else>
                            <div class="flex w-full justify-between">
                                <p class="font-extralight">Start date</p>
                                <p v-if="startDate" class="font-medium">{{ startDate.toDateString() }}</p>
                                <p v-else class="font-medium">None</p>
                            </div>
                            <div class="flex w-full justify-between">
                                <p class="font-extralight">Finish date</p>
                                <p v-if="finishDate" class="font-medium">{{ finishDate.toDateString() }}</p>
                                <p v-else class="font-medium">None</p>
                            </div>
                            <hr />
                            <small v-if="recurrenceRate && specificDayOfWeek !== null">
                                Transaction occurs every
                                {{ recurrenceRate > 1 ? `${recurrenceRate} ${recurrenceType}s` : `${recurrenceType}` }} on
                                <span class="capitalize">{{ daysOfWeek[specificDayOfWeek].label }}</span>
                            </small>
                            <small v-if="recurrenceRate && firstLastDayOfMonth !== null && firstLastDayOfMonth !== 'specific'">
                                Transaction occurs every
                                {{ recurrenceRate > 1 ? `${recurrenceRate} ${recurrenceType}s` : `${recurrenceType}` }} on the
                                <span class="lowercase">
                                    {{ firstLastDayOfMonthChoices.find((el) => el.value === firstLastDayOfMonth)?.label }}
                                </span>
                            </small>
                            <small v-if="recurrenceRate && specificDayOfMonth !== null && firstLastDayOfMonth === 'specific'">
                                Transaction occurs every
                                {{ recurrenceRate > 1 ? `${recurrenceRate} ${recurrenceType}s` : `${recurrenceType}` }} on the
                                <span class="lowercase">
                                    {{ daysOfMonth.find((el) => el.value === specificDayOfMonth)?.label }}
                                </span>
                            </small>
                        </template>
                    </div>
                </template>
            </div>
        </div>

        <!-- Buttons -->
        <div class="flex mt-auto border-t-1 p-3">
            <RouterLink :to="exitLink" class="h-full">
                <Button class="h-full" label="Exit" severity="secondary" outlined />
            </RouterLink>
            <div class="flex gap-3 ml-auto">
                <Button v-if="step > 1" severity="secondary" outlined @click="step--">
                    <template #default>
                        <p v-if="windowWidth > 768">Previous</p>
                        <SvgIcon v-else type="mdi" :path="mdiArrowLeft" />
                    </template>
                </Button>
                <Button v-if="step < 6" :disabled="disabled" @click="step++">
                    <template #default>
                        <p v-if="windowWidth > 768">Next</p>
                        <SvgIcon v-else type="mdi" :path="mdiArrowRight" />
                    </template>
                </Button>
                <Button v-else label="Submit"></Button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.slide-in {
    animation-name: slideIn;
    animation-duration: 500ms;
    animation-timing-function: ease;
    animation-fill-mode: forwards;
}

@keyframes slideIn {
    from {
        transform: translateX(100%);
    }
    to {
        transform: translateX(0);
    }
}

.boxes {
    position: relative;
    padding: 1rem;
}

.boxes.shadow-right {
    box-shadow: inset -10px 0px 10px -11px #a3a3a3;
}

.boxes.shadow-left {
    box-shadow: inset 10px 0px 10px -11px #a3a3a3;
}

.boxes.shadow-both {
    box-shadow: inset -10px 0px 10px -11px #a3a3a3, inset 10px 0px 10px -11px #a3a3a3;
}
</style>
