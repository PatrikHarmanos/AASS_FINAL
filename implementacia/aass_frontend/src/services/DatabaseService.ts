// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';

class DatabaseService {
  async postDatabase(data: any): Promise<any> {
    return await api
      .post<any>('api/v1/admin/database-connections', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateDatabase(databaseId: string, data: any): Promise<any> {
    return await api
      .put<any>('api/v1/admin/database-connections/' + databaseId, data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getDatabaseList(): Promise<any> {
    return await api
      .get<any>('/api/v1/admin/database-connections')
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getDatabase(databaseId: string): Promise<any> {
    return await api
      .get<any>('/api/v1/database/' + databaseId)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getSchema(schemaPath: string): Promise<any> {
    return await api
      .get<any>('api/v1/image/' + schemaPath)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteDatabase(databaseId: string): Promise<any> {
    return await api
      .delete<any>('api/v1/admin/database-connections/' + databaseId)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async testDatabase(data: any): Promise<any> {
    return await api
      .post<any>('api/v1/admin/database-connections/test-connection', data)
      .then((response) => response.status)
      .catch((error) => {
        console.log(error);
        return error.status;
      });
  }
}

export default new DatabaseService();
