<template>
  <div class="full-width" style="height: 100%">
    <q-card class="card" style="height: 100%">
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
          name="editor"
          label="Query Editor"
          class="tab"
        />
        <q-tab
          style="height: 40px"
          name="history"
          :label="$t('history')"
          class="tab"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated style="height: calc(100% - 40px)">
        <q-tab-panel name="editor" style="height: 100%; padding-bottom: 0">
          <div style="height: calc(100% - 60px)">
            <CodeEditor
              :hide_header="false"
              :languages="[['pgsql']]"
              :display_language="false"
              :copy_code="true"
              :theme="mainStore.darkMode ? 'dark' : 'light'"
              class="code-editor"
              width="100%"
              height="100%"
              :count_lines="true"
              border-radius="1px"
              :wrap_code="true"
              v-model="code"
            ></CodeEditor>
          </div>
          <div
            style="height: 60px; background-color: white"
            class="row justify-between"
          >
            <div class="row justify-center items-center">
              <div
                v-if="queryData"
                class="queryStatusBox"
                :class="{
                  'status-success': queryData.status === 'OK',
                  'status-wrong': queryData.status === 'WRONG_ANSWER',
                  'status-error': queryData.status === 'SYNTAX_ERROR',
                }"
              >
                {{ queryStatusText }}
              </div>
              <div
                v-if="queryData && queryData.executionTime"
                class="queryExecutionTimeBox row justify-center items-center"
              >
                <q-icon name="schedule" size="18px" class="q-mr-xs" />
                {{ queryData.executionTime }}
              </div>
            </div>
            <div class="row justify-end items-center">
              <q-btn
                @click="
                  mainStore.assignmentVisible = !mainStore.assignmentVisible
                "
                round
                size="sm"
                color="orange"
                :icon="
                  mainStore.assignmentVisible ? 'visibility_off' : 'visibility'
                "
              />
              <q-btn
                push
                class="q-ma-sm"
                unelevated
                color="primary"
                text-color="white"
                :label="$t('run')"
                @click="runCode"
              />
            </div>
          </div>
        </q-tab-panel>
        <q-tab-panel style="padding: 0" name="history">
          <dashboard-query-history />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import CodeEditor from 'simple-code-editor';
import { useMainStore } from '../../stores/main-store';
import { useCourseStore } from 'src/stores/course-store';
import { QueryResult } from '../models';
import DashboardQueryHistory from './DashboardQueryHistory.vue';

const mainStore = useMainStore();
const courseStore = useCourseStore();

const queryData = computed<QueryResult>(
  () => courseStore.queryResults[courseStore.activeTaskId]
);

const queryStatusText = computed(() => {
  if (queryData.value.status === 'OK') return 'SPRÁVNE';
  else if (queryData.value.status === 'WRONG_ANSWER') return 'NESPRÁVNE';
  else if (queryData.value.status === 'SYNTAX_ERROR') return 'CHYBA';
  return '';
});

const tab = ref('editor');

const code = computed({
  get() {
    return queryData.value?.query ? queryData.value.query : '';
  },
  set(newValue) {
    const result = {
      query: newValue,
    };
    if (courseStore.activeTaskId in courseStore.queryResults) {
      courseStore.queryResults[courseStore.activeTaskId].query = newValue;
    } else {
      courseStore.queryResults[courseStore.activeTaskId] = result;
    }
  },
});

function runCode(): void {
  mainStore.queryData = [];
  mainStore.queryError = '';
  mainStore.queryExecutionTime = '';
  mainStore.queryStatus = '';
  let data = {
    query: code.value,
  };
  mainStore.runSQL(data);
}
</script>

<style scoped lang="scss">
@import '../../css/mixins.scss';
.q-tabs__content--align-justify .q-tab {
  flex: none;
}

.tab :deep(.q-tab__label) {
  font-weight: bold;
}

.card {
  height: 100%;

  @include media-xs-only {
    box-shadow: none;
    border-top: none;
    border-radius: 0;
    border-bottom: 2px solid lightgrey;
  }
}

.queryStatusBox {
  color: white;
  font-size: 13px;
  padding: 8px;
  border-radius: 7px;
  font-weight: bold;
  margin-right: 10px;
}

.status-success {
  background-color: green;
}

.status-wrong {
  background-color: orange;
}

.status-error {
  background-color: red;
}

.queryExecutionTimeBox {
  font-size: 15px;
  color: black;
  padding: 8px;
  border-radius: 7px;
  font-weight: bold;
  background-color: #fafafa;
}
</style>
