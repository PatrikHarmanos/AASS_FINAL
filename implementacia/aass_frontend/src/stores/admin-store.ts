import { defineStore } from 'pinia';
import AdminsService from 'src/services/AdminsService';
import AdminService from 'src/services/AdminService';
import DashboardService from 'src/services/DashboardService';
import { Course } from 'components/models';

export const useAdminStore = defineStore('adminStore', {
  state: () => ({
    admins: [] as Array<any>,
    courses: [] as Array<Course>,
    databaseConnections: [] as any,
    weeks: [] as any,
    queryDataAdmin: {},
    queryStatusAdmin: '',
    queryExecutionTimeAdmin: '',
    tasks: [] as any,
    registerErrors: {
      nameErrors: [] as Array<string>,
      emailErrors: [] as Array<string>,
      passwordErrors: [] as Array<string>,
    },
    seminars: [] as Array<any>,
    allSeminars: [] as Array<any>,
    loadingSeminars: false,
    specialCourses: [] as Array<any>,
    seminarStudents: [] as Array<any>,
    selectedSeminar: Object as any,
    studentSeminarWeeks: [],
    loadingStudentsWeeks: false,
  }),
  actions: {
    async getCourses() {
      return AdminService.getCourses().then((res) => {
        this.courses = res;
      });
    },
    async getCoursesForTaskCreate() {
      this.specialCourses = [];
      return AdminService.getCourses().then((res) => {
        // label -> course name
        // value -> first course seminar ID
        for (const key in res) {
          this.specialCourses.push({
            label: res[key].name,
            value: res[key].id,
          });
        }
      });
    },
    async getDatabaseConnections() {
      this.databaseConnections = [];
      return AdminService.getDatabaseConnections().then((res) => {
        console.log(res);
        for (const key in res) {
          this.databaseConnections.push({
            label: res[key].connection_name,
            value: [res[key].id, res[key].schema_path],
          });
        }
      });
    },
    async getWeeksForCourse(courseId: string) {
      this.weeks = [];
      return AdminService.getWeeksForCourse(courseId).then((res) => {
        console.log(res);
        for (const key in res) {
          this.weeks.push({
            label: res[key].name,
            value: res[key].id,
          });
        }
      });
    },
    async runSQLAdmin(databaseConnectionId: string, queryData: any) {
      return DashboardService.runSQLAdmin(databaseConnectionId, queryData).then(
        (response) => {
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
          this.queryDataAdmin = result;
          this.queryStatusAdmin = response.data.status;
          this.queryExecutionTimeAdmin = response.data.execution_time;
          return response.data;
        }
      );
    },
    async getAllTasks() {
      return AdminService.getAllTasks().then((res) => {
        console.log(res);
        this.tasks = res;
      });
    },
    async fetchAdmins() {
      return AdminsService.getAdmins().then((res) => {
        console.log(res);
      });
    },

    async register(data: any) {
      return AdminsService.postAdmin(data).then((res) => {
        console.log(res);
      });
    },

    async deleteAdmin(adminId: string) {
      return AdminsService.deleteAdmin(adminId).then((res) => {
        console.log(res);
      });
    },

    async fetchSeminars() {
      return AdminService.getSeminars().then((res) => {
        for (const key in res) {
          this.seminars.push({
            label: res[key].name,
            value: res[key].id,
          });
        }
      });
    },

    async getAllSeminars() {
      this.loadingSeminars = true;
      return AdminService.getSeminars().then((res) => {
        this.allSeminars = res;
        this.loadingSeminars = false;
      });
    },

    async addStudentsToSeminar(seminarId: any, data: any) {
      return AdminService.addStudentsToSeminar(seminarId.value, data).then(
        (res) => {
          console.log(res);
        }
      );
    },

    async fetchStudentsForSeminar(seminarId: string) {
      return AdminService.fetchStudentsForSeminar(seminarId).then((res) => {
        this.seminarStudents = res.data.data;
      });
    },

    async getStudentsSeminarWeeks(seminarId: string, studentId: string) {
      this.loadingStudentsWeeks = true;
      return AdminService.getStudentsSeminarWeeks(seminarId, studentId).then(
        (res) => {
          console.log(res);
          this.studentSeminarWeeks = res.data;
          this.loadingStudentsWeeks = false;
        }
      );
    },

    async fetchSeminar(seminarId: string) {
      return AdminService.fetchSeminar(seminarId).then((res) => {
        this.selectedSeminar = res.data.data;
      });
    },
  },
});
