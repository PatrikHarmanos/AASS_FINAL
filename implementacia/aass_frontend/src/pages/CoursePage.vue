<template>
  <q-page class="row" style="padding: 20px">
    <div style="width: 100%">
      <h2 class="q-mb-sm q-mt-none text-h4 text-bold">Moje úlohy</h2>

      <p style="font-size: 18px">Zoznam úloh, ktoré môžete vyriešiť.</p>

      <hr />

      <!-- <q-inner-loading
        :showing="visible"
        :label="$t('loadingCourses')"
        label-class="text-secondary"
        label-style="font-size: 1.1em"
      /> -->

      <div class="row">
        <div v-if="tasks" class="full-width">
          <q-table
            :rows="tasks"
            :columns="columns"
            row-key="name"
            class="q-mt-md"
          >
            <template v-slot:body="props">
              <q-tr :props="props">
                <q-td key="id" :props="props">
                  {{ props.row.id }}
                </q-td>
                <q-td key="title" :props="props">
                  {{ props.row.title }}
                </q-td>
                <q-td key="description" :props="props">
                  {{ props.row.description }}
                </q-td>
                <q-td key="action" :props="props">
                  <q-btn
                    push
                    color="primary"
                    align="center"
                    label="Vyriešiť"
                    @click="$router.push('/courses/' + props.row.id)"
                  />
                </q-td>
              </q-tr>
            </template>
          </q-table>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useAuthStore } from 'src/stores/auth-store';
import { computed } from 'vue';

const authStore = useAuthStore();
authStore.me();

authStore.fetchTasks();

const tasks = computed<any[]>(() => authStore.tasks);

const columns = [
  {
    name: 'id',
    required: true,
    label: 'ID',
    align: 'center',
    sortable: true,
  },
  {
    name: 'title',
    required: true,
    label: 'Názov',
    align: 'center',
    sortable: true,
  },
  {
    name: 'description',
    required: true,
    label: 'Popis',
    align: 'center',
    sortable: true,
  },
  {
    name: 'action',
    required: true,
    label: 'Akcia',
    align: 'center',
    sortable: true,
  },
];
</script>

<style lang="scss"></style>
