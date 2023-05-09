import { defineStore } from 'pinia';
import DashboardService from 'src/services/DashboardService';
import { useCourseStore } from './course-store';

export const useMainStore = defineStore('mainStore', {
  state: () => ({
    taskNumber: 0,
    selectedWeek: 0,
    queryData: [] as any,
    queryError: '',
    queryExecutionTime: '',
    queryStatus: '',
    darkMode: false,
    assignmentVisible: true,
    db_admin_picture: 'schema_db0',
    tags: ['ľahké', 'stredné', 'ťažké'],
    databases: ['db1', 'db2', 'db3'],
    selectedDatabase: '',
    schemas: {
      db1: 'schema_db0.png',
      db2: 'schema_db1.png',
      db3: 'schema_db2.png',
    },
  }),
  getters: {
    doubleCount: (state) => state.taskNumber * 2,
  },
  actions: {
    async runSQL(queryData: any) {
      const courseStore = useCourseStore();
      return DashboardService.runSQL(queryData).then((response) => {
        console.log(response);
        const data = response.data.data;
        let index = 0;
        for (const key in data) {
          data[key] = Object.assign({ 'no.': index }, data[key]);
          index += 1;
        }
        const result = {
          query: queryData.query,
          result: data,
          status: response.data.status,
          executionTime: response.data.execution_time,
        };
        courseStore.queryResults[courseStore.activeTaskId] = result;
        this.queryData = data;
        console.log(this.queryData);
        this.queryStatus = response.data.status;
        this.queryExecutionTime = response.data.execution_time;
        return response.data;
      });
    },

    async createTask(data: any) {
      return DashboardService.createTask(data).then((response) => {
        return response;
      });
    },

    async saveTaskResult(data: any, taskId: number) {
      return DashboardService.saveTaskResult(data, taskId).then((response) => {
        return response;
      });
    },

    async changePicture(data: any) {
      this.db_admin_picture = 'schema_db1';
      //return DashboardService.changePicture(data).then((response) => {
      //  return response;
      //});
    },
  },
});
