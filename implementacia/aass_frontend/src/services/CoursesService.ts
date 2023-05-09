// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';
import { useCourseStore } from 'stores/course-store';

class CoursesService {
  async postCourse(data: any): Promise<any> {
    return await api
      .post<any>('api/v1/admin/courses', data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async updateCourse(courseId: string, data: any): Promise<any> {
    return await api
      .put<any>('api/v1/admin/courses/' + courseId, data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getStudentSeminars(): Promise<any> {
    const courseStore = useCourseStore();
    return await api
      .get<any>('api/v1/seminars')
      .then((response) => response.data.data)
      .catch((error) => {
        // set errors for email in login
      });
  }

  async deleteCourse(courseId: string): Promise<any> {
    return await api
      .delete<any>('api/v1/admin/courses/' + courseId)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getWeeks(courseId: string): Promise<any> {
    return await api
      .get<any>(`/api/v1/weeks/${courseId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getWeek(weekId: string): Promise<any> {
    return await api
      .get<any>(`/api/v1/week/${weekId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getActiveTaskDetail(courseId: string, taskId: string) {
    return await api
      .get<any>(`/api/v1/courses/${courseId}/tasks/${taskId}`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getQueryHistory(courseId: string, taskId: string) {
    return await api
      .get<any>(`/api/v1/courses/${courseId}/tasks/${taskId}/history`)
      .then((response) => response.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new CoursesService();
