<template>
  <q-page style="padding: 20px" class="column items-center">
    <h2 class="q-mb-md q-mt-none text-h4" style="width: 90%">
      {{ $route.params.name.toString().toUpperCase() }}
    </h2>

    <div class="column items-start" style="width: 90%">
      <WeekComponent v-for="week in weeks" :week="week" :key="week.id" />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCourseStore } from 'stores/course-store';
import { computed } from 'vue';
import { Week } from 'components/models';
import WeekComponent from 'components/ExpandableWeekComponent.vue';

const courseStore = useCourseStore();
// courseStore.fetchWeeks('9d1fc32d-3652-0fb6-f43a-9c7b18977a4f');
const weeks = computed<Week[]>(() => courseStore.weeks);
</script>

<style scoped lang="scss">
.course-container {
  padding: 10px;
}
</style>
