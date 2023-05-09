<template>
  <div style="height: 100%; overflow-y: scroll">
    <q-card style="height: 100%">
      <q-tabs
        v-model="tab"
        class="text-grey"
        align="justify"
        style="height: 40px"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab
          style="height: 40px"
          name="description"
          :label="$t('output')"
          class="tab"
        />
        <q-tab
          style="height: 40px"
          name="stats"
          :label="$t('expectedOutput')"
          class="tab"
        />
        <q-tab
          style="height: 40px"
          name="scheme"
          :label="$t('scheme')"
          class="tab"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="description" class="q-pa-none">
          <div v-if="queryData && queryData.result">
            <q-table :rows="queryData.result" row-key="name" separator="cell" />
          </div>
          <div
            v-else-if="queryData && queryData.error"
            class="queryErrorMessage"
          >
            {{ queryData.error }}
          </div>
          <div v-else>
            <p class="text-black text-subtitle1 q-ma-md">
              Pre zobrazenie výstupu spustite query.
            </p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="stats" class="q-pa-none">
          <q-table
            v-if="courseStore.activeTask.task_result"
            :rows="JSON.parse(String(courseStore.activeTask.task_result))"
            separator="cell"
          />
          <div v-else>
            <p class="text-black text-subtitle1 q-ma-md">
              Očakávaný výstup nebol zadaný.
            </p>
          </div>
        </q-tab-panel>

        <q-tab-panel name="scheme">
          <viewer
            class="schema-viewer"
            v-if="courseStore.activeTask.schema_path"
            :images="[
              'http://localhost:8000/' + courseStore.activeTask.schema_path,
            ]"
            :options="{
              inline: false,
              title: false,
              rotatable: false,
              toolbar: false,
              navigator: false,
              navbar: false,
            }"
          >
            <q-img
              v-for="src in [
                'http://localhost:8000/' + courseStore.activeTask.schema_path,
              ]"
              :key="src"
              :src="src"
              class="schema-img"
            />
          </viewer>
          <div v-else>
            <p class="text-black text-subtitle1 q-ma-md">
              Obrázok schémy nebol zadaný.
            </p>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCourseStore } from 'src/stores/course-store';
import { QueryResult } from '../models';
const courseStore = useCourseStore();

const queryData = computed<QueryResult>(
  () => courseStore.queryResults[courseStore.activeTaskId]
);

const tab = ref('description');
</script>

<style scoped lang="scss">
.q-tabs__content--align-justify .q-tab {
  flex: none;
}

.tab :deep(.q-tab__label) {
  font-weight: bold;
}

.queryErrorMessage {
  color: red;
  font-size: 20px;
  font-weight: 500;
  margin: 20px;
}

.schema-viewer:hover {
  cursor: pointer;
}
</style>
