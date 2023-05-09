<template>
  <q-page class="row justify-center">
    <div class="main_div">
      <q-table
        :rows="queryHistory"
        :columns="columns"
        row-key="name"
        virtual-scroll
        :rows-per-page-options="[0]"
      >
        <template v-slot:body="props">
          <q-tr :props="props">
            <q-td
              class="query-cell"
              key="query"
              :props="props"
              style="
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              "
            >
              {{ props.row.query }}
              <q-popup-proxy>
                <q-banner class="bg-grey text-white row">
                  {{ props.row.query }}
                  <q-btn
                    flat
                    icon="content_copy"
                    @click="copyToClipboard(props.row.query)"
                  />
                </q-banner>
              </q-popup-proxy>
            </q-td>
            <q-td key="result" :props="props">
              <q-badge
                :color="
                  props.row.status === 'OK'
                    ? 'green'
                    : props.row.status === 'WRONG_ANSWER'
                    ? 'orange'
                    : 'red'
                "
                >{{ props.row.status }}</q-badge
              >
            </q-td>
            <q-td key="action" :props="props">
              <q-btn
                outline
                rounded
                color="primary"
                align="center"
                label="Spustiť"
                @click="runCode(props.row.query)"
              />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCourseStore } from 'src/stores/course-store';
import { useMainStore } from 'src/stores/main-store';
import { computed } from 'vue';
import { copyToClipboard } from 'quasar';

const courseStore = useCourseStore();
const mainStore = useMainStore();

courseStore.getQueryHistory();
const queryHistory = computed<any>(() => courseStore.activeTaskQueryHistoery);

function runCode(query: string): void {
  mainStore.queryData = [];
  mainStore.queryError = '';
  mainStore.queryExecutionTime = '';
  mainStore.queryStatus = '';
  let data = {
    query: query,
  };
  mainStore.runSQL(data);
}

const columns = [
  {
    name: 'query',
    required: true,
    label: 'Query',
    align: 'left',
    sortable: true,
    style: 'max-width: 230px;',
  },
  {
    name: 'result',
    required: true,
    label: 'Výsledok',
    align: 'left',
    sortable: true,
  },
  {
    name: 'action',
    required: true,
    label: 'Akcia',
    align: 'left',
    sortable: true,
  },
];
</script>

<style scoped lang="scss">
@import '../../css/mixins.scss';

.main_div {
  width: 100%;

  .table {
    text-align: left;
  }
}

.query-history__row {
  color: black;
  font-size: 15px;
  padding: 10px;
  border-bottom: 1px solid black;
  display: flex;
  justify-content: space-between;

  .query-history__row-query {
    display: inline-flex;
    min-width: fit-content;
    align-items: center;
  }

  .query-history__row-status {
    display: inline-flex;
    justify-content: center;
    min-width: fit-content;
    align-items: center;
    width: 70px;
  }

  .query-history__row-action {
    display: inline-flex;
    justify-content: center;
    min-width: fit-content;
    align-items: center;
  }
}

.queryStatusBox {
  color: white;
  font-size: 10px;
  padding: 8px;
  border-radius: 7px;
  font-weight: bold;
  margin-right: 10px;
}

.status-success {
  border: 1px solid green;
  color: green;
}

.status-wrong {
  border: 1px solid orange;
  color: orange;
}

.status-error {
  border: 1px solid red;
  color: red;
}

.query-cell:hover {
  cursor: pointer;
}
</style>
