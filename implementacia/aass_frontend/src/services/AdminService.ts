// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';

class AdminService {
  async getCourses(): Promise<any> {
    return await api
      .get<any>('api/v1/admin/courses')
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }
  async getDatabaseConnections(): Promise<any> {
    return await api
      .get<any>('api/v1/admin/database-connections')
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }
  async getWeeksForCourse(courseId: string): Promise<any> {
    return await api
      .get<any>(`api/v1/admin/courses/${courseId}/weeks`)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }
  async getAllTasks(): Promise<any> {
    return await api
      .get<any>('api/v1/admin/tasks')
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

  async addStudentsToSeminar(seminarId: string, data: any): Promise<any> {
    return await api
      .post<any>(`api/v1/admin/seminars/${seminarId}/add-students`, data)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  }

  async fetchStudentsForSeminar(seminarId: string): Promise<any> {
    return await api
      .get<any>(`api/v1/teacher/seminars/${seminarId}/students`)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  }

  async getStudentsSeminarWeeks(
    seminarId: string,
    studentId: string
  ): Promise<any> {
    return await api
      .get<any>(`api/v1/teacher/seminars/${seminarId}/students/${studentId}`)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  }

  async fetchSeminar(seminarId: string): Promise<any> {
    return await api
      .get<any>(`api/v1/admin/seminars/${seminarId}`)
      .then((response) => response)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new AdminService();
