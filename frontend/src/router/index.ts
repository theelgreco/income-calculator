import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import LoginView from "@/views/LoginView.vue";
import { IncomeCalculatorApi } from "@/api";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/login",
            name: "login",
            meta: { title: "Login", requiresAuth: false },
            component: LoginView,
        },
        {
            path: "/",
            name: "home",
            meta: { title: "Home", requiresAuth: true },
            component: HomeView,
        },
        // {
        //   path: '/about',
        //   name: 'about',
        //   // route level code-splitting
        //   // this generates a separate chunk (About.[hash].js) for this route
        //   // which is lazy-loaded when the route is visited.
        //   component: () => import('../views/AboutView.vue')
        // }
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

export default router;
