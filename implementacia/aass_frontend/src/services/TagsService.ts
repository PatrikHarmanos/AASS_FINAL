// import type { AxiosError, AxiosRequestConfig } from 'axios';
import { api } from 'src/boot/axios';

class TagsService {
  async postTag(data: any): Promise<any> {
    return await api
      .post<any>('api/v1/admin/tags', data)
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }

  async getTags(): Promise<any> {
    return await api
      .get<any>('api/v1/tags')
      .then((response) => response.data.data)
      .catch((error) => {
        console.log(error);
      });
  }
}

export default new TagsService();
