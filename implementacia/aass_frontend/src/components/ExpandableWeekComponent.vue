<template>
  <q-expansion-item
    class="shadow-1 overflow-hidden full-width"
    style="border-radius: 30px"
    header-class="bg-secondary text-white"
    expand-icon-class="text-white"
  >
    <template v-slot:header>
      <q-item-section avatar>
        <q-avatar
          icon="storage"
          color="secondary"
          text-color="white"
          size="40px"
        />
      </q-item-section>

      <q-item-section class="text-left text-bold text-subtitle1">
        {{ week.name }}
      </q-item-section>

      <q-item-section side>
        <q-circular-progress
          show-value
          class="text-white"
          :value="tasksCompleted"
          :min="0"
          :max="tasksTotal"
          size="40px"
          color="primary"
        >
          {{ tasksCompleted }}/{{ tasksTotal }}
        </q-circular-progress>
      </q-item-section>
    </template>
    <q-card>
      <q-card-section class="text-left q-pb-xs">
        {{ week.description }}
      </q-card-section>
      <q-separator spaced inset />
      <q-card-section class="q-pt-none">
        <q-list>
          <q-item
            v-for="(task, id) in week.tasks"
            :key="task.id"
            class="task-item cursor-pointer text-left"
          >
            <q-item-section
              avatar
              class="q-pr-none q-mr-md flex row items-center justify-center"
              style="
                background-color: #26a69a;
                border-radius: 50%;
                height: 45px;
                min-width: 45px;
              "
            >
              <q-icon name="assignment" color="white" size="sm" />
            </q-item-section>
            <q-item-section @click="click(id)">
              <q-item-label class="text-bold"
                >{{ id + 1 }}. {{ task.name }}</q-item-label
              >
              <q-item-label caption lines="2">
                {{ task.description }}
              </q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon
                v-if="task.status === 'OK'"
                name="done"
                color="secondary"
              />
            </q-item-section>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-expansion-item>
</template>

<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCourseStore } from 'src/stores/course-store';
import { useAdminStore } from 'src/stores/admin-store';

const route = useRoute();
const router = useRouter();
const courseStore = useCourseStore();
const adminStore = useAdminStore();

const props = defineProps<{
  week: any;
  count: number;
  admin?: boolean;
}>();

const tasksCompleted = computed(() =>
  !props.admin
    ? courseStore.weeks.data[props.count].tasks_completed_count
    : adminStore.studentSeminarWeeks.data[props.count].tasks_completed_count
);
const tasksTotal = computed(() =>
  !props.admin
    ? courseStore.weeks.data[props.count].task_records_count
    : adminStore.studentSeminarWeeks.data[props.count].task_records_count
);

function click(id: number) {
  courseStore.activeWeek = props.week;
  courseStore.activeTask = props.week.tasks[id];
  courseStore.activeTaskId = id + 1;
  router.push('/courses/' + route.params.id + '/weeks/' + props.week.id);
}
</script>

<style scoped lang="scss">
.shadow-1 {
  text-align: center;
  margin: 10px;
  background-color: lightgrey;
  color: black;
}

.task-item:hover {
  background-color: rgba(211, 211, 211, 0.516);
}
</style>
