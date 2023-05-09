<template>
  <q-item
    clickable
    @click="selectTask"
    :class="{ 'task-link-active': courseStore.activeTaskId == id }"
    class="task-link"
  >
    <q-item-section avatar style="min-width: 35px">
      <q-icon name="assignment" color="secondary" />
    </q-item-section>

    <q-item-section no-wrap>
      <q-item-label class="text-bold">{{ id }}. úloha</q-item-label>
      <q-item-label caption>{{ link.name || 'Opis úlohy' }}</q-item-label>
    </q-item-section>

    <q-item-section v-if="true" class="items-end">
      <q-icon
        v-if="props.status === 'OK'"
        name="done"
        color="secondary"
        size="sm"
      />
    </q-item-section>
  </q-item>
</template>

<script setup lang="ts">
import { useCourseStore } from '../stores/course-store';

export interface EssentialLinkProps {
  link: any;
  id: number;
  status: string;
}
const props = withDefaults(defineProps<EssentialLinkProps>(), {
  id: 11,
});

const courseStore = useCourseStore();

function selectTask() {
  courseStore.activeTask = courseStore.activeWeek.tasks[props.id - 1];
  courseStore.activeTaskId = props.id;
}
</script>

<style scoped lang="scss">
.task-link {
  padding: 12px 16px;
}

.task-link-active {
  background-color: rgba(211, 211, 211, 0.516);
}
</style>
