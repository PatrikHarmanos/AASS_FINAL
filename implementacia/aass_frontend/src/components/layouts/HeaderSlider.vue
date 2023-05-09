<template>
  <div class="row items-center">
    <q-btn
      @click="courseStore.decrementTaskNumber()"
      unelevated
      padding="xs"
      :color="buttonColor"
      icon="chevron_left"
      :disabled="courseStore.activeTaskId === 1"
    />
    <span class="q-mx-sm text-bold">{{ courseStore.activeTaskId }}. úloha</span>
    <q-btn
      @click="courseStore.incrementTaskNumber()"
      unelevated
      padding="xs"
      :color="buttonColor"
      icon="chevron_right"
      :disabled="
        courseStore.activeWeek.tasks
          ? courseStore.activeTaskId === courseStore.activeWeek.tasks.length
          : false
      "
    />
  </div>
</template>

<script setup lang="ts">
import { useCourseStore } from '../../stores/course-store';

export interface HeaderSliderProps {
  buttonColor?: string;
}
withDefaults(defineProps<HeaderSliderProps>(), {
  buttonColor: 'primary',
});

const courseStore = useCourseStore();
</script>
