// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';

class AdminsService {
  async getAdmins(): Promise<any> {
    return await api
      .get<any>('api/v1/superadmin/admin')
      .then((response) => {
        console.log(response.status);
        return response.data.data;
      })
      .catch((error) => {
        console.log(error);
      });
  }

  async postAdmin(data: any): Promise<any> {
    return await api
      .post<any>('api/v1/superadmin/admin', data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteAdmin(adminId: string): Promise<any> {
    return await api
      .delete<any>('api/v1/superadmin/admin/' + adminId)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new AdminsService();
