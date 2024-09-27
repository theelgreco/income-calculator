import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import { IncomeCalculatorApi } from "@/customApi";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            meta: { title: "Login", requiresAuth: false },
            component: () => import("@/views/LoginView.vue"),
        },
        {
            path: "/",
            redirect: () => {
                return new Date().getFullYear().toString();
            },
        },
        {
            path: "/:year",
            name: "year",
            meta: { title: "Home", requiresAuth: true, hasYear: true },
            component: () => import("@/views/YearView.vue"),
        },
    ],
});

router.beforeEach(async (to, from, next) => {
    if (to.meta.requiresAuth) {
        const incomeCalculatorApi = new IncomeCalculatorApi();

        try {
            await incomeCalculatorApi.validateJWT();
            next();
        } catch (err: any) {
            localStorage.removeItem("jwt");
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

        if (!parseInt(year) || (parseInt(year) < 1900 && parseInt(year) > 3024)) {
            router.replace({ name: to.name, params: { ...to.params, year: new Date().getFullYear().toString() } });
        }
    }
});

export default router;
