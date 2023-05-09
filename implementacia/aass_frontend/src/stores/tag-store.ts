import { defineStore } from 'pinia';
import TagsService from 'src/services/TagsService';

export const useTagStore = defineStore('tagStore', {
  state: () => ({
    tagRegisterErrors: {
      nameErrors: [] as Array<string>,
    },
  }),
  getters: {},
  actions: {
    async createTag(data: any) {
      return TagsService.postTag(data).then((res) => {
        console.log(res);
      });
    },
    async fetchTags() {
      return TagsService.getTags().then((res) => {
        console.log(res);
      });
    },
  },
});
