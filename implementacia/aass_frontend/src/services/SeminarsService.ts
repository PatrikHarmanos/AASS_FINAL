// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';

class SeminarsService {
  async postSeminar(data: any): Promise<any> {
    return await api
      .post<any>('api/v1/admin/seminars', data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateSeminar(seminarId: string, data: any): Promise<any> {
    return await api
      .put<any>('api/v1/admin/seminars/' + seminarId, data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getSeminars(): Promise<any> {
    return await api
      .get<any>('api/v1/admin/seminars')
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteSeminar(seminarId: string): Promise<any> {
    return await api
      .delete<any>('api/v1/admin/seminars/' + seminarId)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new SeminarsService();
