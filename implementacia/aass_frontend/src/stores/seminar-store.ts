import { defineStore } from 'pinia';
import SeminarsService from 'src/services/SeminarsService';
import { Seminar } from 'components/models';

export const useSeminarStore = defineStore('seminarStore', {
  state: () => ({
    courseId: '',
    seminars: [] as Array<Seminar>,
    registerErrors: {
      nameErrors: [] as Array<string>,
    },
  }),
  getters: {},
  actions: {
    async registerSeminar(data: any) {
      return SeminarsService.postSeminar(data).then((res) => {
        console.log(res);
      });
    },

    async updateSeminar(seminarId: string, data: any) {
      return SeminarsService.updateSeminar(seminarId, data).then((res) => {
        console.log(res);
      });
    },

    async fetchSeminars() {
      return SeminarsService.getSeminars().then((res) => {
        console.log(res);
        this.seminars = res;
      });
    },

    async deleteSeminar(seminarId: string) {
      return SeminarsService.deleteSeminar(seminarId).then((res) => {
        console.log(res);
      });
    },
  },
});
