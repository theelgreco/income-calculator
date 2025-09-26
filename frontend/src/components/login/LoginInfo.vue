<script setup lang="ts">
import { motion, type MotionProps } from "motion-v";
import { CalendarIcon, Currency, Globe } from "lucide-vue-next";
import InfoCard from "@/components/login/InfoCard.vue";

const iconMotions: MotionProps = {
    initial: { strokeWidth: 0, opacity: 0, rotate: -90, left: "10%" },
    animate: { strokeWidth: 0.25, opacity: 0.05, rotate: 0, left: "0%" },
};

const headingMotions: MotionProps = {
    initial: { y: 25, opacity: 0 },
    animate: { y: 0, opacity: 1 },
    transition: { type: "spring" },
};
</script>

<template>
    <div>
        <div class="flex w-full flex-wrap gap-5 max-xl:justify-center max-xl:text-center">
            <motion.img
                v-bind="headingMotions"
                :whilePress="{ scale: 0.9 }"
                :drag="true"
                :dragConstraints="{ top: 0, right: 0, bottom: 0, left: 0 }"
                class="bg-white border rounded-full p-5 shadow-lg min-w-[100px] w-[100px] h-[100px] drag-none z-1"
                src="/192w/icon.png"
            />
            <div class="flex flex-col justify-center">
                <motion.h1 v-bind="headingMotions" class="font-black text-lg xl:text-3xl">Take control of your finances today</motion.h1>
                <motion.h2 v-bind="headingMotions" class="text-sm xl:text-lg font-light">
                    One <i class="font-bold">simple</i> transaction at a time
                </motion.h2>
            </div>
        </div>
        <div class="mt-5 xl:mt-10 w-full flex flex-col gap-3">
            <InfoCard title="Track Your Income Effortlessly" description="Easily log and categorize your income and transactions.">
                <motion.svg asChild v-bind="iconMotions" :transition="{ type: 'spring' }">
                    <CalendarIcon :size="200" class="absolute top-0 rotate-0 opacity-5" />
                </motion.svg>
            </InfoCard>
            <InfoCard title="Visualise Your Progress" description="Get clear monthly and yearly overviews with interactive charts.">
                <motion.svg asChild v-bind="iconMotions" :transition="{ type: 'spring', delay: 0.25 }">
                    <Currency :size="200" class="absolute top-0 -rotate-0 opacity-5" />
                </motion.svg>
            </InfoCard>
            <InfoCard
                title="Secure & Private"
                description="Your data is protected with industry-standard security. So you can manage your finances with confidence."
            >
                <motion.svg asChild v-bind="iconMotions" :transition="{ type: 'spring', delay: 0.5 }">
                    <Globe :size="200" class="absolute top-0 opacity-5" />
                </motion.svg>
            </InfoCard>
        </div>
    </div>
</template>
