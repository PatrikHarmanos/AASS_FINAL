<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="row justify-between items-center">
        <div class="row items-center">
          <q-btn
            v-if="$route.params.week_id"
            flat
            dense
            round
            icon="menu"
            aria-label="Menu"
            @click="toggleLeftDrawer"
          />
          <q-img v-else src="sql.svg" width="20px" class="q-mr-xs" />
          <p class="q-mb-none q-ml-sm text-bold">QUERY</p>
        </div>

        <header-slider v-if="$route.params.week_id && $q.screen.gt.xs" />
        <div class="row items-left">
          <language-switch />
          <user-menu />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-if="$route.params.week_id"
      v-model="leftDrawerOpen"
      show-if-above
      bordered
    >
      <q-list class="full-height column justify-between">
        <div style="height: 90%">
          <q-item-label
            header
            class="row items-center justify-between"
            style="height: 91px; padding; border-bottom: 1px solid lightgrey;"
          >
            <div class="column items-start justify-center">
              <p class="q-mb-sm text-bold text-black">
                {{ courseStore.activeCourse }}
              </p>
              <p class="q-mb-none">{{ courseStore.activeWeek.name }}</p>
            </div>
            <q-circular-progress
              show-value
              class="text-primary"
              :value="courseStore.activeWeek.tasks_completed_count"
              :min="0"
              :max="courseStore.activeWeek.task_records_count"
              size="50px"
              color="primary"
            >
              {{ courseStore.activeWeek.tasks_completed_count }}/{{
                courseStore.activeWeek.task_records_count
              }}
            </q-circular-progress>
          </q-item-label>

          <div class="linksContainer">
            <EssentialLink
              v-for="(link, id) in courseStore.activeWeek.tasks"
              :key="link.name"
              :id="id + 1"
              :status="link.status"
              :link="link"
            />
          </div>
        </div>

        <q-item-label
          header
          class="column items-start justify-center"
          style="border-top: 1px solid lightgrey; height: 8%"
        >
          <div class="text-bold text-grey">{{ courseStore.activeSeminar }}</div>
        </q-item-label>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import EssentialLink from 'components/EssentialLink.vue';
import UserMenu from 'components/layouts/UserMenu.vue';
import HeaderSlider from 'components/layouts/HeaderSlider.vue';
import { useCourseStore } from 'src/stores/course-store';
import languageSwitch from '../components/layouts/LanguageSwitch.vue';

const courseStore = useCourseStore();

const leftDrawerOpen = ref(false);

function toggleLeftDrawer() {
  leftDrawerOpen.value = !leftDrawerOpen.value;
}
</script>

<style>
.linksContainer {
  overflow-y: scroll;
  height: 90%;
}
</style>
