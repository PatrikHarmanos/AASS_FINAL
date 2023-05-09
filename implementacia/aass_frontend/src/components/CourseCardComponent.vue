<template>
  <q-card
    v-ripple
    class="course-card cursor-pointer q-hoverable column justify-center"
    @click="select"
  >
    <span class="q-focus-helper"></span>
    <q-card-section>
      <h4 class="text-bold q-my-none q-mt-lg">{{ course.name }}</h4>
    </q-card-section>
    <q-card-section>
      <p></p>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { useAdminStore } from 'src/stores/admin-store';
import { useCourseStore } from 'stores/course-store';
import { useRouter } from 'vue-router';

export interface course {
  id: string;
  name: string;
  description: string;
}
const props = defineProps<{
  course: course;
  admin?: boolean;
}>();

const router = useRouter();
const courseStore = useCourseStore();
const adminStore = useAdminStore();

function select() {
  if (!props.admin) {
    courseStore.activeCourseId = props.course.id;
    router.push('/courses/' + props.course.id);
  } else {
    adminStore.selectedSeminar = props.course;
    router.push('/admin/seminars/' + props.course.id);
  }
}
</script>

<style scoped lang="scss">
.course-card {
  width: 280px;
  height: 250px;
  text-align: center;
  margin: 10px;
  background-color: $secondary;
  color: white;
}
</style>
