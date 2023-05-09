<template>
  <q-page class="row justify-center">
    <div class="main_div">
      <q-table
        class="table"
        :rows="rows"
        :columns="columns"
        row-key="name"
        virtual-scroll
        v-model:pagination="pagination"
        separator="cell"
        :no-data-label="$t('cantFindData')"
      >
        <template #body="props">
          <q-tr>
            <q-td v-for="col in props.cols" :key="col.name">
              {{ col.value }}
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const pagination = ref({
  rowsPerPage: 10,
});

const columns = [
  {
    name: 'rank',
    label: 'Rank',
    style: 'max-width: 50px',
    headerStyle: 'max-width: 50px',
    align: 'left',
    field: 'rank',
    sortable: true,
  },
  {
    name: 'name',
    label: 'Meno študenta',
    align: 'left',
    field: 'name',
  },
  {
    name: 'task',
    label: 'Dokončené úlohy',
    style: 'max-width: 80px',
    headerStyle: 'max-width: 80px',
    align: 'left',
    field: 'task',
    sortable: true,
  },
];

const rows = [
  {
    rank: 1,
    name: 'Usain Bolt',
    task: 5,
  },
  {
    rank: 2,
    name: 'Blanka Pretrhnutá',
    task: 4,
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
</style>
