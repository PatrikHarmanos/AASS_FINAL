// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';

class TeachersService {
  async getTeachers(): Promise<any> {
    return await api
      .get<any>('api/v1/admin/teachers')
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async postTeacher(data: any): Promise<any> {
    return await api
      .post<any>('api/v1/admin/teachers', data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateTeacher(teacherId: string, data: any): Promise<any> {
    return await api
      .put<any>('api/v1/admin/teachers/' + teacherId, data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async deleteTeacher(teacherId: string): Promise<any> {
    return await api
      .delete<any>('api/v1/admin/teachers/' + teacherId)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new TeachersService();
