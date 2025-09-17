export default {
    root: ({ context }) => ({
        class: [
            // Colors
            "bg-white",
            "dark:bg-white-900",
            "text-surface-700",
            "dark:text-surface-0/80",

            // Shape
            "rounded-md",

            // Borders (Conditional)
            { "border border-solid border-surface-200 dark:border-surface-700": !context.nested },

            // Nested
            { "flex grow border-0": context.nested },
        ],
    }),

    gutter: ({ props }) => ({
        class: [
            // Flexbox
            "flex",
            "items-center",
            "justify-center",
            "shrink-0",

            // Colors
            "bg-white-100",
            "dark:bg-white-700",

            // Transitions
            "transition-all",
            "duration-200",

            // Misc
            {
                "cursor-col-resize": props.layout == "horizontal",
                "cursor-row-resize": props.layout !== "horizontal",
            },
        ],
    }),
    gutterhandler: ({ props }) => ({
        class: [
            "z-20",
            // Colors
            "bg-white-100",
            "dark:bg-white-700",

            // Shape
            "rounded-md",

            //States
            "focus:outline-hidden focus:outline-offset-0 focus-visible:ring-1 focus-visible:ring-primary-400 dark:focus-visible:ring-primary-300",

            // Transitions
            "transition-all",
            "duration-200",

            // Sizing (Conditional)
            {
                "h-[1.70rem]": props.layout == "horizontal",
                "w-[1.70rem] h-2": props.layout !== "horizontal",
            },
        ],
    }),
};
