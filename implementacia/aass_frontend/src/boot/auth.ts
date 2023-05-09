import { truncate } from 'fs';
import { boot } from 'quasar/wrappers';
import authManager from 'src/services/AuthManager';
import { RouteLocationNormalized, RouteLocationRaw } from 'vue-router';
import { useAuthStore } from '../stores/auth-store';

const authStore = useAuthStore();

declare module 'vue-router' {
  interface RouteMeta {
    requiresAuth?: boolean;
    guestOnly?: boolean;
    requiresAdmin?: boolean;
  }
}

const debug = true;

const loginRoute = (from: RouteLocationNormalized): RouteLocationRaw => {
  return {
    name: 'login',
    query: { redirect: from.fullPath },
  };
};

// this boot file wires together authentication handling with router
export default boot(({ router }) => {
  // if the token was removed from storage, redirect to login
  authManager.onLogout(() => {
    router.push(loginRoute(router.currentRoute.value));
  });

  if (!debug) {
    // add route guard to check auth user
    router.beforeEach(async (to) => {
      const isAuthenticated = await authStore.me();
      const isAdmin = authStore.isAdmin;

      // route requires authentication
      if (to.meta.requiresAuth && !isAuthenticated) {
        // check if logged in if not, redirect to login page
        return loginRoute(to);
      }

      if (to.meta.requiresAdmin && !isAdmin) {
        console.log('hello');
        return { name: 'courses' };
      }

      // route is only for guests so redirect to home
      if (to.meta.guestOnly && isAuthenticated) {
        if (authStore.isAdmin) {
          return { name: 'admin' };
        }
        return { name: 'courses' };
      }
    });
  }
});
