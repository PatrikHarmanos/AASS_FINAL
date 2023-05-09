// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { RegisterData, AuthResponse, LoginData } from '../contracts/Auth';
import { useAuthStore } from '../stores/auth-store';
import { StringifyOptions } from 'querystring';

class AuthService {
  async register(data: RegisterData): Promise<any> {
    const response = await api.post<any>('api/auth/register', data);
    console.log(response);
  }

  async login(data: LoginData): Promise<any> {
    const authStore = useAuthStore();
    return await api
      .post<any>('api/auth/login', JSON.stringify(data))
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          authStore.loginError = '';
        }
        return response.data.data;
      })
      .catch((error) => {
        // set errors for email in login
        if (error.response.data.message) {
          authStore.loginError = error.response.data.message;
        }
      });
  }

  async me(): Promise<any> {
    const response = await api.get<any>('api/auth/me');
    return response.data;
  }

  async fetchTasks(): Promise<any> {
    return await api
      .get<any>('api/tasks')
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async createTask(data: any): Promise<any> {
    return await api
      .post<any>('api/tasks', data)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getTaskById(id: number): Promise<any> {
    return await api
      .get<any>(`api/tasks/${id}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new AuthService();
