import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import http from "@/services/http.service";
import store from "@/store/index";
import { login } from "@/services/auth.service";
import MainLayout from "../components/main-layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import(/* webpackChunkName: "home" */ "../views/homepage.vue"),
      },
      {
        path: "my-queues",
        name: "my-queues",
        component: () => import(/* webpackChunkName: "my-queues" */ "../views/my-queues.vue"),
      },
      {
        path: "create-event",
        name: "create-event",
        component: () => import(/* webpackChunkName: "create-event" */ "../views/create-event.vue"),
      },
      {
        path: "4/:eventUrl/:action?",
        name: "event",
        component: () => import(/* webpackChunkName: "event" */ "../views/event.vue"),
      },
      {
        path: "login",
        name: "login",
        component: () => import(/* webpackChunkName: "login" */ "../views/login.vue"),
      },
      {
        path: "logout",
        name: "logout",
        component: () => import(/* webpackChunkName: "logout" */ "../views/logout.vue"),
      },
      {
        path: "health",
        name: "health",
        component: () => import(/* webpackChunkName: "health" */ "../views/health.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "not-found",
        component: () => import(/* webpackChunkName: "not-found" */ "../views/not-found.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach(() => {
  http.post("check").catch((e) => {
    if (e.errors && e.errors[0] && e.errors[0].message === "E_INVALID_API_TOKEN: Invalid API token") {
      // try logging in first.
      const { user } = store.getters;

      if (user) {
        login({
          username: user.anonymousId,
          password: user.anonymousKey,
        })
          // eslint-disable-next-line
          .then((response: any) => {
            store.dispatch("setUser", {
              ...user,
              jwt: response.token,
              jwtExp: response.expiresAt,
            });
          })
          .catch(() => {
            store.dispatch("logoutUser");
          });
      }
    }
  });
});

export default router;
