<template>
  <div style="height: 100%">
    <q-card style="height: 100%">
      <q-tabs
        v-model="tab"
        class="text-grey"
        align="justify"
        style="height: 40px"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab
          style="height: 40px"
          name="description"
          :label="$t('assignment')"
          class="tab"
        />
        <!-- <q-tab
          style="height: 40px"
          name="stats"
          :label="$t('stats')"
          class="tab"
        /> -->
      </q-tabs>

      <q-separator />

      <q-tab-panels
        v-model="tab"
        animated
        style="max-height: 100%; overflow: scroll; height: 100%"
      >
        <q-tab-panel name="description">
          <div class="text-black q-mb-xl">
            <div class="text-subtitle1 text-bold">
              {{ courseStore.activeTaskId }}. {{ $t('task') }}
            </div>
            <div class="text-h5 text-bold text-primary">
              {{ courseStore.activeTask.name }}
            </div>
            <q-separator class="q-my-md" />
            <div style="font-size: 14px; word-wrap: break-word">
              {{ courseStore.activeTask.description }}
            </div>
            <q-separator class="q-my-md" />
            <div class="row items-center justify-start">
              <q-btn
                push
                unelevated
                color="orange"
                text-color="white"
                :label="$t('hint')"
                @click="hintModal = true"
                class="q-mr-md"
              />
            </div>
          </div>
        </q-tab-panel>

        <q-tab-panel style="padding: 0" name="stats">
          <dashboard-leaderboard />
        </q-tab-panel>
      </q-tab-panels>
    </q-card>

    <q-dialog
      v-model="hintModal"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="modal-head text-black" style="width: 250px">
        <q-card-section>
          <div class="text-h6">{{ $t('hint') }}</div>
        </q-card-section>

        <q-card-section>
          <div>{{ courseStore.activeTask.hint }}</div>
        </q-card-section>

        <q-card-section class="bg-white text-black">
          <div align="right">
            <q-btn
              push
              class="q-ma-sm"
              unelevated
              color="orange"
              text-color="white"
              :label="$t('close')"
              @click="hintModal = false"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { useCourseStore } from '../../stores/course-store';
import DashboardLeaderboard from './DashboardLeaderboard.vue';

const courseStore = useCourseStore();
const tab = ref('description');
const schema_path = computed<any>(() => courseStore.activeTask.schema_path);
const images = ['http://localhost:8000/' + schema_path.value];

const schema = ref(null);

const options = {
  toolbar: false,
  url: 'data-source',
  inline: false,
  title: false,
  rotatable: false,
  navigator: false,
  navbar: false,
};

const hintModal = ref(false);

function showSchema() {
  schema.value.$viewer.show();
}
</script>

<style scoped lang="scss">
.q-tabs__content--align-justify .q-tab {
  flex: none;
}

.tab :deep(.q-tab__label) {
  font-weight: bold;
}

.schema-img {
  max-height: 500px;
  &:hover {
    cursor: pointer;
  }
}
</style>
