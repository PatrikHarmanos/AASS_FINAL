<template>
  <q-page class="column" style="padding: 20px">
    <div>
      <h2 class="q-mb-sm q-mt-none text-h4 text-bold">Admin</h2>
    </div>
    <div>
      <q-btn
        push
        class="q-ma-sm q-mb-lg"
        unelevated
        icon="add"
        color="primary"
        text-color="white"
        label="Nová úloha"
        @click="$router.replace('admin/task-create')"
      />
    </div>
    <div class="row">
      <div v-if="tasks" class="full-width">
        <q-table :rows="tasks" :columns="columns" row-key="name">
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
                  label="Zobraziť"
                  @click="$router.push('/courses/' + props.row.id)"
                />
              </q-td>
            </q-tr>
          </template>
        </q-table>
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
