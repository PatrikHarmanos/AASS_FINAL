import { defineStore } from 'pinia';
import DatabaseService from 'src/services/DatabaseService';
import {Database} from 'components/models';

export const useDatabaseStore = defineStore('databaseStore', {
  state: () => ({
    databases: [] as Array<Database>,
    testStatus: 0,
    schema: null,
    registerErrors: {
      nameErrors: [] as Array<string>,
      descErrors: [] as Array<string>,
      hostErrors: [] as Array<string>,
      portErrors: [] as Array<string>,
      usernameErrors: [] as Array<string>,
      passwordErrors: [] as Array<string>,
      databaseErrors: [] as Array<string>,
      schemaErrors: [] as Array<string>,
    },
  }),
  getters: {},
  actions: {
    async registerDatabase(data: any) {
      return DatabaseService.postDatabase(data).then((res) => {
        console.log(res);
      });
    },

    async updateDatabase(databaseId: string, data: any) {
      return DatabaseService.updateDatabase(databaseId, data).then((res) => {
        console.log(res);
      });
    },

    async fetchDatabaseList() {
      return DatabaseService.getDatabaseList().then((res) => {
        this.databases = res;
      });
    },

    async fetchDatabase(databaseId: string) {
      return DatabaseService.getDatabase(databaseId).then((res) => {
        console.log(res);
      });
    },

    async fetchSchemaImage(schemaPath: string) {
      return DatabaseService.getSchema(schemaPath).then((res) => {
        this.schema = res;
      });
    },

    async deleteDatabase(databaseId: string) {
      return DatabaseService.deleteDatabase(databaseId).then((res) => {
        console.log(res);
      });
    },

    async testDatabase(data: any) {
      return DatabaseService.testDatabase(data).then((res) => {
        this.testStatus = res
      });
    },
  },
});
