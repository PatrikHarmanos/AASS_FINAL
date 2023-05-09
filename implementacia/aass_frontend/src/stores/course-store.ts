import { defineStore } from 'pinia';
import CoursesService from 'src/services/CoursesService';
import { Week, Task } from 'src/contracts/Course';
import { Course, WeeksObject, QueryResults } from 'components/models';

export const useCourseStore = defineStore('courseStore', {
  state: () => ({
    courses: [] as Array<Course>,
    activeCourseId: '',
    weeks: {} as WeeksObject,
    loadingWeeks: false,
    loadingCourses: false,
    activeWeek: {} as Week,
    activeTask: {} as Task,
    activeSeminar: '',
    activeCourse: '',
    activeTaskId: 0,
    queryResults: {} as QueryResults,
    registerErrors: {
      nameErrors: [] as Array<string>,
      descErrors: [] as Array<string>,
      emailErrors: [] as Array<string>,
    },
    activeTaskQueryHistoery: [],
  }),
  getters: {},
  actions: {
    async registerCourse(data: any) {
      return CoursesService.postCourse(data).then((res) => {
        console.log(res);
      });
    },

    async updateCourse(courseId: string, data: any) {
      return CoursesService.updateCourse(courseId, data).then((res) => {
        console.log(res);
      });
    },

    async getStudentSeminars() {
      this.loadingCourses = true;
      return CoursesService.getStudentSeminars().then((res) => {
        console.log(res);
        this.courses = res;
        this.loadingCourses = false;
      });
    },

    async deleteCourse(courseId: string) {
      return CoursesService.deleteCourse(courseId).then((res) => {
        console.log(res);
      });
    },

    async fetchWeeks(seminarId: string) {
      this.loadingWeeks = true;
      return CoursesService.getWeeks(seminarId).then((res) => {
        this.weeks = res;
        this.loadingWeeks = false;
      });
    },

    async fetchWeek(weekId: string) {
      return CoursesService.getWeek(weekId).then((res) => {
        console.log(res);
        this.activeWeek = res.data;
        this.activeTask = res.data.tasks[0];
        this.activeSeminar = res.seminar.name;
        this.activeCourse = res.seminar.course.name;
        if (this.activeTaskId === 0) {
          this.activeTaskId = 1;
        }
      });
    },

    incrementTaskNumber(): void {
      this.activeTask = this.activeWeek.tasks[this.activeTaskId];
      this.activeTaskId++;
    },

    decrementTaskNumber(): void {
      this.activeTask = this.activeWeek.tasks[this.activeTaskId - 2];
      this.activeTaskId--;
    },

    getActiveTaskDetail(couseId: string, taskId: string) {
      CoursesService.getActiveTaskDetail(couseId, taskId).then((response) => {
        console.log(response);
      });
    },

    getQueryHistory() {
      CoursesService.getQueryHistory(
        this.activeWeek.course_id,
        this.activeTask.id
      ).then((response) => {
        console.log(response);
        this.activeTaskQueryHistoery = response.data;
      });
    },
  },
});
