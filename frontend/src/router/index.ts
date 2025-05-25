import { createRouter, createWebHistory } from "vue-router";
import { AuthenticationApi } from "@/api";
import { defaultApiConfiguration } from "@/fetch";
import { usePreviousRoute } from "@/composables/previousRoute";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            meta: { title: "Login", requiresAuth: false, showNav: false },
            component: () => import("@/views/LoginView.vue"),
        },
        {
            path: "/",
            name: "home",
            redirect: () => {
                return `/calendar/${new Date().getFullYear().toString()}`;
            },
        },
        {
            path: "/calendar",
            redirect: () => {
                return `/calendar/${new Date().getFullYear().toString()}`;
            },
            children: [
                {
                    path: ":year",
                    name: "year",
                    meta: { title: "Home", requiresAuth: true, hasYear: true, showNav: true },
                    component: () => import("@/views/YearView.vue"),
                },
                {
                    path: ":year/:month",
                    name: "month",
                    meta: { title: "Month", requiresAuth: true, hasYear: true, hasMonth: true, showNav: true },
                    component: () => import("@/views/MonthView.vue"),
                },
            ],
        },
        {
            path: "/transactions",
            name: "transactions",
            meta: { title: "Transactions", requiresAuth: true, showNav: true },
            component: () => import("@/views/TransactionsView.vue"),
        },
        {
            path: "/transactions/create",
            name: "createTransaction",
            meta: { title: "Create a transaction", requiresAuth: true, showNav: false, slide: true, slideFrom: "right" },
            component: () => import("@/views/CreateTransactionsView.vue"),
        },
        {
            path: "/transactions/:transaction/edit",
            name: "editTransaction",
            meta: { title: "Edit a transaction", requiresAuth: true, showNav: false, slide: true, slideFrom: "right" },
            component: () => import("@/views/EditTransactionView.vue"),
        },
    ],
});

const previousRoute = usePreviousRoute();

router.beforeEach(async (to, from, next) => {
    if (from.path !== "/") {
        previousRoute.value = from;
    }

    if (to.meta.requiresAuth) {
        const authenticationApi = new AuthenticationApi(defaultApiConfiguration);

        try {
            await authenticationApi.apiValidateJWTGet();
            next();
        } catch (err: any) {
            console.error(await err.response.json());
            // localStorage.removeItem("jwt");
            next("/login");
        }
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    if (to.meta.hasYear) {
        let { year } = to.params;

        if (Array.isArray(year)) year = year[0];

        const parsedYear = parseInt(year);

        if (!parsedYear || (parsedYear < 1900 && parsedYear > 3024)) {
            router.replace({ name: to.name, params: { ...to.params, year: new Date().getFullYear().toString() } });
        }
    }

    if (to.meta.hasMonth) {
        const monthNames = [
            "january",
            "february",
            "march",
            "april",
            "may",
            "june",
            "july",
            "august",
            "september",
            "october",
            "november",
            "december",
        ];

        let { month } = to.params;

        if (Array.isArray(month)) month = month[0];

        const monthLower = month.toLowerCase();

        if (!monthNames.includes(monthLower)) {
            router.replace({ name: to.name, params: { ...to.params, month: monthNames[new Date().getMonth()] } });
        } else if (!monthNames.includes(month)) {
            router.replace({ name: to.name, params: { ...to.params, month: monthLower } });
        }
    }
});

export default router;
