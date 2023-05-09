// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { RegisterData, AuthResponse, LoginData } from '../contracts/Auth';
import { useCourseStore } from '../stores/course-store';
import { useMainStore } from 'src/stores/main-store';
import { useAdminStore } from 'src/stores/admin-store';

class DashboardService {
  async runSQL(data: any): Promise<any> {
    const courseStore = useCourseStore();
    const adminStore = useAdminStore();
    return await api
      .post<any>(
        'api/v1/tasks/' + courseStore.activeTask.id + '/run-query',
        data
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        const result = {
          query: data.query,
          status: error.response.data.status,
          error: error.response.data.message,
        };
        adminStore.queryDataAdmin = result;
        courseStore.queryResults[courseStore.activeTaskId] = result;
      });
  }

  async runSQLAdmin(databaseConnectionId: string, data: any): Promise<any> {
    const courseStore = useCourseStore();
    const adminStore = useAdminStore();
    return await api
      .post<any>(
        'api/v1/admin/database-connections/' +
          databaseConnectionId +
          '/run-query',
        data
      )
      .then((response) => {
        return response;
      })
      .catch((error) => {
        const result = {
          query: data.query,
          status: error.response.data.status,
          error: error.response.data.message,
        };
        adminStore.queryDataAdmin = result;
        courseStore.queryResults[courseStore.activeTaskId] = result;
      });
  }

  async changePicture(data: any): Promise<any> {
    return 'schema_db0.png';
    //return await api.post<any>('api/v1/sqlTester', data);
  }

  async createTask(data: any): Promise<any> {
    console.log(data);

    return await api
      .post<any>('api/v1/admin/tasks', JSON.stringify(data))
      .then((response) => response.data.data);
  }

  async saveTaskResult(data: any, taskId: number): Promise<any> {
    return await api
      .post<any>(
        'api/v1/admin/tasks/' + taskId + '/save-query-result',
        JSON.stringify(data)
      )
      .then((response) => response.data.data);
  }
}

export default new DashboardService();
