<template>
  <q-page style="padding: 20px" class="column items-center">
    <div style="width: 90%" class="flex align-start">
      <q-btn
        @click="$router.push('/courses')"
        push
        color="grey"
        icon="arrow_back"
        align="center"
        class="q-mb-md"
      >
        <div>{{ $t('subjects') }}</div>
      </q-btn>
    </div>
    <div
      v-if="!visible"
      class="q-mb-md q-mt-none text-h4 text-bold"
      style="width: 90%"
    >
      <span>Predmet: </span>
      <span class="text-primary">{{ weeks.seminar.course.name }}</span>
      &MediumSpace;
      <span>Seminár: </span>
      <span class="text-primary">{{ weeks.seminar.name }}</span>
      <hr />
    </div>

    <q-inner-loading
      :showing="visible"
      :label="$t('loadingWeeks')"
      label-class="text-secondary"
      label-style="font-size: 1.1em"
    />

    <div class="column items-start" style="width: 90%">
      <WeekComponent
        v-for="(week, count) in weeks.data"
        :week="week"
        :key="week.id"
        :count="count"
      />
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useCourseStore } from 'stores/course-store';
import { computed } from 'vue';
import { WeeksObject } from 'components/models';
import WeekComponent from 'components/ExpandableWeekComponent.vue';
import { useRoute } from 'vue-router';
import { onBeforeRouteUpdate } from 'vue-router';

const route = useRoute();

const courseStore = useCourseStore();
courseStore.fetchWeeks(String(route.params.id));
const weeks = computed<WeeksObject>(() => courseStore.weeks);
const visible = computed<boolean>(() => courseStore.loadingWeeks);

onBeforeRouteUpdate(async (to, from) => {
  if (to.params.id !== from.params.id) {
    courseStore.fetchWeeks(String(route.params.id));
  }
});
</script>

<style scoped lang="scss">
.course-container {
  padding: 10px;
}
</style>
