import { defineStore } from 'pinia';
import TeachersService from 'src/services/TeachersService';

export const useTeacherStore = defineStore('teacherStore', {
  state: () => ({
    registerErrors: {
      nameErrors: [] as Array<string>,
      emailErrors: [] as Array<string>,
      passwordErrors: [] as Array<string>,
    },
  }),
  getters: {},
  actions: {
    async fetchTeachers() {
      return TeachersService.getTeachers().then((res) => {
        console.log(res);
      });
    },

    async registerTeacher(data: any) {
      return TeachersService.postTeacher(data).then((res) => {
        console.log(res);
      });
    },

    async updateTeacher(teacherId: string, data: any) {
      return TeachersService.updateTeacher(teacherId, data).then((res) => {
        console.log(res);
      });
    },

    async deleteTeacher(teacherId: string) {
      return TeachersService.deleteTeacher(teacherId).then((res) => {
        console.log(res);
      });
    },
  },
});
