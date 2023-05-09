<template>
  <q-page class="page row justify-center">
    <div class="main_div">
      <div>
        <q-btn
          @click="$router.push('/admin')"
          push
          color="secondary"
          icon="arrow_back"
          align="center"
          class="q-my-md"
        >
          <div>späť</div>
        </q-btn>
      </div>
      <q-table
        class="table"
        title="Zoznam kurzov"
        table-style="border-top: 5px solid #eeeeee"
        :rows="rows"
        :columns="columns"
        row-key="name"
        virtual-scroll
        v-model:pagination="pagination"
        :separator="separator"
        :filter="filter"
        no-data-label="I can't find any data 😞"
      >
        <template #top-right>
          <div class="row">
            <q-space />
            <q-input
              class="q-ma-sm q-mr-md"
              outlined
              dense
              debounce="300"
              v-model="filter"
              placeholder="Search"
            >
              <template v-slot:append>
                <q-icon name="search" />
              </template>
            </q-input>

            <CourseModal create @reload="fetch" />
          </div>
        </template>

        <template #body="props">
          <q-tr :class="props.rowIndex % 2 === 0 ? 'bg-grey-3' : 'bg-white'">
            <q-td key="id" :props="props">
              {{ props.row.id }}
            </q-td>
            <q-td key="name" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td class="text" key="status" :props="props">
              <q-badge v-if="props.row.status === 'Aktívna'" color="green">
                {{ props.row.status }}
              </q-badge>
              <q-badge v-else color="grey-5">
                {{ props.row.status }}
              </q-badge>
            </q-td>
            <q-td key="admin" :props="props">
              {{ props.row.name }}
            </q-td>
            <q-td auto-width>
              <ConfirmationDialog
                :opts="{
                  title: 'Potvrdenie zmazania',
                  message: 'Naozaj chcete zmazať kurz?',
                }"
                @yes="deleteRow(props.row)"
              />
            </q-td>
            <q-td auto-width>
              <CourseModal :data="props.row" @reload="fetch" />
            </q-td>
          </q-tr>
        </template>
      </q-table>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import CourseModal from 'components/CourseCreation.vue';
import ConfirmationDialog from 'components/popup/ConfirmationDialog.vue';
import { useCourseStore } from 'stores/course-store';
import { useAdminStore } from 'stores/admin-store';
import { Course } from 'components/models';
import { Notify } from 'quasar';

const filter = ref('');
const pagination = ref({ rowsPerPage: 0 });
const separator = ref('none');

const courseStore = useCourseStore();
const adminStore = useAdminStore();

const columns = [
  {
    name: 'id',
    style: 'max-width: 150px;',
    wrap: true,
    required: true,
    label: 'ID kurzu',
    align: 'middle',
    field: 'id',
    sortable: true,
  },
  {
    name: 'name',
    style: 'max-width: 150px;',
    wrap: true,
    required: true,
    label: 'Názov kurzu',
    align: 'middle',
    field: 'name',
    sortable: true,
  },
  {
    name: 'status',
    required: true,
    label: 'Status',
    align: 'middle',
    field: 'status',
    sortable: true,
  },
  {
    name: 'admin',
    required: true,
    label: 'Admin',
    align: 'middle',
    field: 'admin',
    sortable: true,
  },
];

let rows = computed<Array<Course>>(() => adminStore.courses);

adminStore.getCourses().then((res) => {
  console.log(res);
});

function deleteRow(row: Course) {
  courseStore.deleteCourse(row.id).then((res) => {
    console.log(res);

    Notify.create({
      message: 'Kurz bol úspešne zmazaný.',
      position: 'top-right',
      type: 'warning',
    });
  });

  fetch();
}
</script>

<style scoped lang="scss">
@import '../css/mixins.scss';

.page {
  background-color: #f0f6fb;
}

.main_div {
  @include media-md-up {
    padding-bottom: 5%;
    width: 70%;
  }

  @include media-md-down {
    padding-top: 1%;
    padding-bottom: 2%;
    width: 100%;
  }

  .table {
    box-shadow: 8px 8px 18px 10px rgba(216, 216, 216, 0.916);
    border-collapse: collapse;
    border-radius: 15px;
    border-style: solid;
    border-width: thick;
    border-color: $grey-3;
    text-align: center;
  }
}
</style>
