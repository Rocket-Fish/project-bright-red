import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import MainLayout from "../components/main-layout.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:pathMatch(.*)*',
    component: MainLayout,
    children: [
      {
        path: '/',
        name: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/home.vue'),
      },
      {
        path: '/my-queues',
        name: 'my-queues',
        component: () => import(/* webpackChunkName: "profile" */ '../views/my-queues.vue'),
      },
      {
        path: '/:pathMatch(.*)*',
        name: 'not-found',
        component: () => import(/* webpackChunkName: "not-found" */ '../views/not-found.vue'),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
