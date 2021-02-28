import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import MainLayout from "../components/main-layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/:pathMatch(.*)*",
    component: MainLayout,
    children: [
      {
        path: "",
        name: "home",
        component: () => import(/* webpackChunkName: "home" */ "../views/home.vue"),
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
        path: "4/:eventUrl",
        component: () => import(/* webpackChunkName: "event" */ "../components/container.vue"),
        children: [
          {
            path: "",
            name: "event",
            component: () => import("../views/event.vue"),
          },
          // DESCOPED for version 1
          // {
          //   path: "admin",
          //   name: "event-admin",
          //   component: () => import("../views/event-admin.vue"),
          // },
        ],
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

export default router;
