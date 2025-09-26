export interface CalendarNavigatorProps {
    year: number;
}

export interface CalendarNavigatorEmits {
    (event: "update:year", value: number): void;
}

export const enum NavigatorDirection {
    PREVIOUS = "previous",
    NEXT = "next",
}

export interface CalendarNavigatorButtonProps {
    direction: NavigatorDirection;
    isSkip?: boolean;
}
