export default {
    root: "flex",
    controls: {
        class: [
            // Flexbox & Alignment
            "flex xl:flex-col justify-center gap-2",

            // Spacing
            "p-4.5",
        ],
    },
    container: {
        class: [
            "flex-auto",

            // Shape
            "rounded-md",

            // Color
            "bg-white dark:bg-white-900",
            "border border-surface-200 dark:border-surface-700",
            "outline-hidden",
        ],
    },
};
