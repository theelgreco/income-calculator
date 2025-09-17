export default {
    root: ({ props }) => ({
        class: [
            "flex grow",
            {
                "flex-col": props.layout === "vertical",
                "flex-row": props.layout === "horizontal",
            },
        ],
    }),
    event: ({ props, context }) => ({
        class: [
            "flex relative min-h-[70px]",
            {
                "flex-row-reverse":
                    props.align === "right" || (props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 1),
                "flex-col not-last:flex-1": props.layout === "horizontal",
                "flex-col-reverse ":
                    props.align === "bottom" || (props.layout === "horizontal" && props.align === "alternate" && context.index % 2 === 1),
            },
        ],
    }),
    eventOpposite: ({ props, context }) => ({
        class: [
            "flex-1",
            {
                "px-4": props.layout === "vertical",
                "py-4": props.layout === "horizontal",
            },
            {
                "text-right":
                    props.align === "left" || (props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 0),
                "text-left":
                    props.align === "right" || (props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 1),
            },
        ],
    }),
    eventSeparator: ({ props }) => ({
        class: [
            "flex items-center flex-initial",
            {
                "flex-col": props.layout === "vertical",
                "flex-row": props.layout === "horizontal",
            },
        ],
    }),
    eventMarker: {
        class: [
            "relative",

            // Display & Flexbox
            "inline-flex items-center justify-center",

            // Size
            "w-4.5 h-4.5",

            // Appearance
            "rounded-full border-2 border-surface-200 bg-white dark:border-surface-700 dark:bg-white-950",

            // Before
            "before:rounded-full before:w-1.5 before:h-1.5 before:bg-primary",
            // After
            "after:absolute after:rounded-full after:w-full after:h-full after:shadow-xs",
        ],
    },
    eventConnector: ({ props }) => ({
        class: [
            "grow bg-white-300 dark:bg-white-700",
            {
                "w-[2px]": props.layout === "vertical",
                "w-full h-[2px]": props.layout === "horizontal",
            },
        ],
    }),
    eventContent: ({ props, context }) => ({
        class: [
            "flex-1",
            {
                "px-4": props.layout === "vertical",
                "py-4": props.layout === "horizontal",
            },
            {
                "text-left":
                    props.align === "left" || (props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 0),
                "text-right":
                    props.align === "right" || (props.layout === "vertical" && props.align === "alternate" && context.index % 2 === 1),
            },
            {
                "min-h-0": props.layout === "vertical" && context.index === context.count - 1,
                "grow-0": props.layout === "horizontal" && context.index === context.count - 1,
            },
        ],
    }),
};
