export default {
    root: "flex **:data-[pc-name=pclist]:h-full",
    sourceControls: {
        class: [
            // Flexbox & Alignment
            "flex xl:flex-col justify-center gap-2",

            // Spacing
            "p-4.5",
        ],
    },
    sourceListContainer: {
        class: [
            // Flexbox
            "grow shrink basis-2/4",

            // Shape
            "rounded-md",

            // Color
            "bg-white dark:bg-white-900",
            "border border-surface-200 dark:border-surface-700",
            "outline-hidden",
        ],
    },
    transferControls: {
        class: [
            // Flexbox & Alignment
            "flex xl:flex-col justify-center gap-2",

            // Spacing
            "p-4.5",
        ],
    },
    targetListContainer: {
        class: [
            // Flexbox
            "grow shrink basis-2/4",

            // Shape
            "rounded-md",

            // Color
            "bg-white dark:bg-white-900",
            "border border-surface-200 dark:border-surface-700",
            "outline-hidden",
        ],
    },
    targetControls: {
        class: [
            // Flexbox & Alignment
            "flex xl:flex-col justify-center gap-2",

            // Spacing
            "p-4.5",
        ],
    },
    transition: {
        enterFromClass: "transition-none!",
        enterActiveClass: "transition-none!",
        leaveActiveClass: "transition-none!",
        leaveToClass: "transition-none!",
    },
};
