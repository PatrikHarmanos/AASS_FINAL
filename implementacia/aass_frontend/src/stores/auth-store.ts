import { defineStore } from 'pinia';
import AuthService from 'src/services/AuthService';
import AuthManager from 'src/services/AuthManager';
import { LoginData, AuthResponse } from '../contracts/Auth';
import { useCourseStore } from 'stores/course-store';

export const useAuthStore = defineStore('authStore', {
  state: () => ({
    user: {} as AuthResponse,
    loginError: '',
    isAdmin: false,
    tasks: [] as any,
    loadingTasks: false,
    activeTask: Object,
  }),
  actions: {
    async register(data: any) {
      return AuthService.register(data).then((response) => {
        return response;
      });
    },
    async login(data: LoginData) {
      return AuthService.login(data).then((response) => {
        this.user = response;
        this.isAdmin = response.user.is_admin;
        // set Bearer token to local storage
        AuthManager.setToken(response.access_token);
        return response;
      });
    },

    async me() {
      return AuthService.me().then((response) => {
        this.user = response.data;
        this.isAdmin = response.data.is_admin;
        // this.isAdmin = response.user.is_admin ? response.user.is_admin : false;
        return response.Authenticated;
      });
    },

    async logout() {
      return AuthManager.logout();
    },

    async fetchTasks() {
      this.loadingTasks = true;
      return AuthService.fetchTasks().then((res) => {
        console.log(res);
        this.tasks = res.data;
        this.loadingTasks = false;
      });
    },

    async createTask(data: any) {
      return AuthService.createTask(data).then((res) => {
        console.log(res);
      });
    },

    async getTaskById(id: number) {
      return AuthService.getTaskById(id).then((res) => {
        this.activeTask = res.data;
        console.log(res);
      });
    },
  },
});
