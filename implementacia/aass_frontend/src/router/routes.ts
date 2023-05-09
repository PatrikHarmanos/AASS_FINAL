import { RouteRecordRaw } from 'vue-router';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        name: 'login',
        meta: { guestOnly: true },
        component: () => import('pages/LoginPage.vue'),
      },
    ],
  },
  {
    path: '/courses',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'courses',
        meta: { requiresAuth: true },
        component: () => import('pages/CoursePage.vue'),
      },
    ],
  },
  {
    path: '/courses/:id',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        meta: { requiresAuth: true },
        component: () => import('pages/SolveTaskPage.vue'),
      },
    ],
  },
  {
    path: '/courses/:id/weeks/:week_id',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        meta: { requiresAuth: true },
        component: () => import('pages/DashboardPage.vue'),
      },
    ],
  },
  {
    path: '/dashboard',
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        meta: { requiresAuth: true },
        component: () => import('src/pages/DashboardPage.vue'),
      },
    ],
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/LoginPage.vue') }],
  },

  {
    path: '/register',
    name: 'register',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/RegisterPage.vue'),
      },
    ],
  },

  // ADMIN ROUTES
  {
    path: '/admin',
    meta: { requiresAdmin: true },
    component: () => import('layouts/DashboardLayout.vue'),
    children: [
      {
        path: '',
        name: 'admin',
        meta: { requiresAdmin: true },
        component: () => import('pages/AdminPage.vue'),
      },
      {
        path: 'task-create',
        name: 'createTask',
        meta: { requiresAdmin: true },
        component: () => import('src/pages/AdminCreateTaskPage.vue'),
      },
      // {
      //   path: 'courses',
      //   name: 'admin-courses',
      //   meta: { requiresAdmin: true },
      //   component: () => import('pages/AdminManageCoursePage.vue'),
      // },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    name: 'notFound',
    component: () => import('pages/ErrorNotFound.vue'),
  },
];

export default routes;
