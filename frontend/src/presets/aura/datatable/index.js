export default {
    root: ({ props }) => ({
        class: [
            "relative",

            // Flex & Alignment
            { "flex flex-col": props.scrollable && props.scrollHeight === "flex" },

            // Size
            { "h-full": props.scrollable && props.scrollHeight === "flex" },
        ],
    }),
    mask: {
        class: [
            // Position
            "absolute",
            "top-0 left-0",
            "z-20",

            // Flex & Alignment
            "flex items-center justify-center",

            // Size
            "w-full h-full",

            // Color
            "bg-white-100/40 dark:bg-white-900/40",

            // Transition
            "transition duration-200",
        ],
    },
    loadingIcon: {
        class: "w-8 h-8 animate-spin",
    },
    tableContainer: ({ props }) => ({
        class: [
            { relative: props.scrollable, "flex flex-col grow": props.scrollable && props.scrollHeight === "flex" },

            // Size
            { "h-full": props.scrollable && props.scrollHeight === "flex" },
        ],
    }),
    header: ({ props }) => ({
        class: [
            "font-bold",

            // Shape
            props.showGridlines ? "border-x border-t border-b-0" : "border-y border-x-0",

            // Spacing
            "p-4",

            // Color
            "bg-white dark:bg-white-900",
            "border-surface-200 dark:border-surface-700",
            "text-surface-700 dark:text-white/80",
        ],
    }),
    table: {
        class: "w-full border-spacing-0 border-separate",
    },
    thead: ({ context }) => ({
        class: [
            {
                "bg-white dark:bg-white-900 top-0 z-40 sticky": context.scrollable,
            },
        ],
    }),
    tbody: ({ instance, context }) => ({
        class: [
            {
                "sticky z-20": instance.frozenRow && context.scrollable,
            },
            "bg-white dark:bg-white-900",
        ],
    }),
    tfoot: ({ context }) => ({
        class: [
            {
                "bg-white bottom-0 z-0": context.scrollable,
            },
        ],
    }),
    footer: {
        class: [
            "font-bold",

            // Shape
            "border-t-0 border-b border-x-0",

            // Spacing
            "p-4",

            // Color
            "bg-white dark:bg-white-900",
            "border-surface-200 dark:border-surface-700",
            "text-surface-700 dark:text-white/80",
        ],
    },
    column: {
        headerCell: ({ context, props }) => ({
            class: [
                "font-semibold",
                "leading-[normal]",

                // Position
                { "sticky z-20 border-b": props.frozen || props.frozen === "" },

                { relative: context.resizable },

                // Alignment
                "text-left",

                // Shape
                { "first:border-l border-y border-r": context?.showGridlines },
                "border-0 border-b border-solid",

                // Spacing
                context?.size === "small" ? "py-1.5 px-2" : context?.size === "large" ? "py-3.75 px-5" : "py-3 px-4",

                // Color
                (props.sortable === "" || props.sortable) && context.sorted
                    ? "bg-highlight"
                    : "bg-white-50 text-surface-700 dark:text-white/80 dark:bg-white-800",
                "border-surface-200 dark:border-surface-700 ",

                // States
                { "hover:bg-white-100 dark:hover:bg-white-800/50": (props.sortable === "" || props.sortable) && !context?.sorted },
                "focus-visible:outline-hidden focus-visible:outline-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

                // Transition
                { "transition duration-200": props.sortable === "" || props.sortable },

                // Misc
                { "cursor-pointer": props.sortable === "" || props.sortable },
                {
                    "overflow-hidden whitespace-nowrap border-y bg-clip-padding": context?.resizable, // Resizable
                },
            ],
        }),
        columnHeaderContent: {
            class: "flex items-center gap-2",
        },
        sort: ({ context }) => ({
            class: [
                context.sorted ? "text-primary-500" : "text-surface-700",
                context.sorted ? "dark:text-primary-400" : "dark:text-white/80",
            ],
        }),
        bodyCell: ({ props, context, state, parent }) => ({
            class: [
                // Font
                "leading-[normal]",

                //Position
                { "sticky box-border border-b": parent.instance.frozenRow },
                { "sticky box-border border-b z-20": props.frozen || props.frozen === "" },

                // Alignment
                "text-left",

                // Shape
                "border-0 border-b border-solid",
                { "first:border-l border-r border-b": context?.showGridlines },
                { "bg-white dark:bg-white-900": parent.instance.frozenRow || props.frozen || props.frozen === "" },

                // Spacing
                { "py-1.5 px-2": context?.size === "small" && !state["d_editing"] },
                { "py-3.75 px-5": context?.size === "large" && !state["d_editing"] },
                { "py-3 px-4": context?.size !== "large" && context?.size !== "small" && !state["d_editing"] },
                { "py-[0.6rem] px-2": state["d_editing"] },

                // Color
                "border-surface-200 dark:border-surface-700",

                {
                    "overflow-hidden whitespace-nowrap border-y bg-clip-padding":
                        parent.instance?.$parentInstance?.$parentInstance?.resizableColumns, // Resizable
                },
            ],
        }),
        footerCell: ({ context }) => ({
            class: [
                // Font
                "font-bold",

                // Alignment
                "text-left",

                // Shape
                "border-0 border-b border-solid",
                { "border-x border-y": context?.showGridlines },

                // Spacing
                context?.size === "small" ? "p-2" : context?.size === "large" ? "p-5" : "p-4",

                // Color
                "border-surface-200 dark:border-surface-700",
                "text-surface-700 dark:text-white/80",
                "bg-white dark:bg-white-900",
            ],
        }),
        sortIcon: ({ context }) => ({
            class: ["ml-2", context.sorted ? "text-inherit" : "text-surface-700 dark:text-white/70"],
        }),
        columnFilter: {
            class: "inline-flex items-center ml-auto font-normal",
        },
        filterOverlay: {
            class: [
                "flex flex-col gap-2",

                // Position
                "absolute top-0 left-0",

                // Shape
                "border-0 dark:border",
                "rounded-md",
                "shadow-md",

                // Size
                "min-w-50",

                // Color
                "bg-white dark:bg-white-900",
                "text-surface-800 dark:text-white/80",
                "dark:border-surface-700",
            ],
        },
        filterConstraintList: {
            class: "m-0 p-0 py-3 list-none",
        },
        filterConstraint: ({ context }) => ({
            class: [
                // Font
                "font-normal",
                "leading-none",

                // Position
                "relative",

                // Shape
                "border-0",
                "rounded-none",

                // Spacing
                "m-0",
                "py-3 px-5",

                // Color
                { "text-surface-700 dark:text-white/80": !context?.highlighted },
                { "bg-white dark:bg-white-900 text-surface-700 dark:text-white/80": !context?.highlighted },
                { "bg-highlight": context?.highlighted },

                //States
                { "hover:bg-white-100 dark:hover:bg-[rgba(255,255,255,0.03)]": !context?.highlighted },
                {
                    "hover:text-surface-700 hover:bg-white-100 dark:hover:text-white dark:hover:bg-[rgba(255,255,255,0.03)]":
                        !context?.highlighted,
                },
                "focus-visible:outline-hidden focus-visible:outline-offset-0 focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

                // Transitions
                "transition-shadow",
                "duration-200",

                // Misc
                "cursor-pointer",
                "overflow-hidden",
                "whitespace-nowrap",
            ],
        }),
        filterOperator: {
            class: [
                // Shape
                "rounded-t-md",

                // Color
                "text-surface-700 dark:text-white/80",
                "bg-white dark:bg-white-700",
                "*:data-[pc-name=pcfilteroperatordropdown]:w-full",
            ],
        },
        filter: ({ instance }) => ({
            class: [{ "flex items-center w-full gap-2": instance.display === "row", "inline-flex ml-auto": instance.display === "menu" }],
        }),
        filterRule: "flex flex-col gap-2",
        filterButtonbar: "flex items-center justify-between p-0",
        filterAddButtonContainer: "*:data-[pc-name=pcfilteraddrulebutton]:w-full",
        rowToggleButton: {
            class: [
                "relative",

                // Flex & Alignment
                "inline-flex items-center justify-center",
                "text-left",

                // Spacing
                "m-0 p-0",

                // Size
                "w-8 h-8",

                // Shape
                "border-0 rounded-full",

                // Color
                "text-surface-500 dark:text-white/70",
                "bg-transparent",
                "focus-visible:outline-hidden focus-visible:outline-offset-0",
                "focus-visible:ring-1 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

                // Transition
                "transition duration-200",

                // Misc
                "overflow-hidden",
                "cursor-pointer select-none",
            ],
        },
        columnResizer: {
            class: [
                "block",

                // Position
                "absolute top-0 right-0",

                // Sizing
                "w-2 h-full",

                // Spacing
                "m-0 p-0",

                // Color
                "border border-transparent",

                // Misc
                "cursor-col-resize",
            ],
        },
        transition: {
            class: "p-4 flex flex-col gap-2",
            enterFromClass: "opacity-0 scale-y-[0.8]",
            enterActiveClass: "transition-[transform,opacity] duration-120 ease-out",
            leaveActiveClass: "transition-opacity duration-100 ease-linear",
            leaveToClass: "opacity-0",
        },
    },
    bodyRow: ({ context, props }) => ({
        class: [
            // Color
            "dark:text-white/80",
            { "bg-highlight": context.selected && props.highlightOnSelect },
            { "bg-white text-surface-600 dark:bg-white-900": !context.selected },
            { "font-bold bg-white dark:bg-white-900 z-20": props.frozenRow },
            {
                "odd:bg-white odd:text-surface-600 dark:odd:bg-white-900 even:bg-white-50 even:text-surface-600 dark:even:bg-white-800/50":
                    context.stripedRows,
            },

            // State
            { "hover:bg-white-300/20 dark:hover:bg-white-800/50 hover:text-surface-600": props.selectionMode && !context.selected },

            // Transition
            { "transition duration-200": (props.selectionMode && !context.selected) || props.rowHover },

            // Misc
            { "cursor-pointer": props.selectionMode },
        ],
    }),
    rowExpansion: {
        class: "bg-white dark:bg-white-900 text-surface-600 dark:text-white/80",
    },
    rowGroupHeader: {
        class: ["sticky z-20", "bg-white text-surface-600 dark:text-white/70", "dark:bg-white-900"],
    },
    rowGroupFooter: {
        class: ["sticky z-20", "bg-white text-surface-600 dark:text-white/70", "dark:bg-white-900"],
    },
    rowToggleButton: {
        class: [
            "relative",

            // Flex & Alignment
            "inline-flex items-center justify-center",
            "text-left",

            // Spacing
            "m-0 p-0",

            // Size
            "w-8 h-8",

            // Shape
            "border-0 rounded-full",

            // Color
            "text-surface-500 dark:text-white/70",
            "bg-transparent",
            "focus-visible:outline-hidden focus-visible:outline-offset-0",
            "focus-visible:ring-1 focus-visible:ring-primary-500 dark:focus-visible:ring-primary-400",

            // Transition
            "transition duration-200",

            // Misc
            "overflow-hidden",
            "cursor-pointer select-none",
        ],
    },
    rowToggleIcon: {
        class: "inline-block w-4 h-4",
    },
    columnResizeIndicator: {
        class: "absolute hidden w-[2px] z-20 bg-primary",
    },
};
