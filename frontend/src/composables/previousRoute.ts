import { ref } from "vue";
import type { RouteLocationNormalizedLoadedGeneric } from "vue-router";

const previousRoute = ref<RouteLocationNormalizedLoadedGeneric | null>(null);

export function usePreviousRoute() {
    return previousRoute;
}
