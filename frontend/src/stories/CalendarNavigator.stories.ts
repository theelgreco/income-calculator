import type { Meta, StoryObj } from "@storybook/vue3-vite";

import CalendarNavigator from "@/components/financial-calendar/CalendarNavigator.vue";
import { ref } from "vue";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories
const meta = {
    title: "Calendar/CalendarNavigator",
    component: CalendarNavigator,
    // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ["autodocs"],
    argTypes: {},
    args: {
        year: 2025,
    },
} satisfies Meta<typeof CalendarNavigator>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
    render: (args) => ({
        components: { CalendarNavigator },
        setup() {
            const year = ref(args.year); // start from args
            return { args, year };
        },
        template: `
            <div class="w-screen h-screen grid place-items-center">
                <CalendarNavigator v-model:year="year" />
            </div>
        `,
    }),
};
