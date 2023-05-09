<template>
  <q-page>
    <!-- for desktop display resizable panels -->
    <splitpanes
      v-if="$q.screen.gt.xs"
      horizontal
      style="height: calc(100vh - 50px)"
      :push-other-panes="false"
    >
      <pane min-size="50">
        <splitpanes :push-other-panes="false">
          <pane min-size="50" v-if="mainStore.assignmentVisible">
            <dashboard-tabs />
          </pane>
          <pane min-size="80">
            <code-editor
              title="Example component"
              active
              :todos="todos"
              :meta="meta"
            ></code-editor>
          </pane>
        </splitpanes>
      </pane>
      <pane min-size="30">
        <dashboard-results-tabs />
      </pane>
    </splitpanes>

    <!-- for mobiles stack elements on top -->
    <div v-else style="height: calc(100vh - 100px)">
      <div class="header-slider__mobile">
        <header-slider :buttonColor="'grey'" />
      </div>
      <div style="height: 50%">
        <code-editor title="Example component" active></code-editor>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import CodeEditor from 'src/components/dashboard/DashboardCodeEditor.vue';
import DashboardTabs from 'src/components/dashboard/DashboardAssignmentTabs.vue';
import HeaderSlider from 'src/components/layouts/HeaderSlider.vue';
import DashboardResultsTabs from 'src/components/dashboard/DashboardResultsTabs.vue';
import { useCourseStore } from 'src/stores/course-store';
import { useRoute } from 'vue-router';
import { useMainStore } from 'src/stores/main-store';

const { Splitpanes, Pane } = require('splitpanes');
const route = useRoute();
const courseStore = useCourseStore();
const mainStore = useMainStore();

courseStore.fetchWeek(String(route.params.week_id));
</script>

<style lang="scss">
@import 'splitpanes/dist/splitpanes.css';

.splitpanes__pane {
  justify-content: center;
  align-items: center;
  font-family: Helvetica, Arial, sans-serif;
  color: rgba(255, 255, 255, 0.6);
  font-size: 5em;
}

.splitpanes--vertical > .splitpanes__splitter {
  min-width: 4px;
  background: grey;

  &:hover {
    background: $primary;
  }
}

.splitpanes--horizontal > .splitpanes__splitter {
  min-height: 4px;
  background: grey;

  &:hover {
    background: $primary;
  }
}

.header-slider__mobile {
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid lightgrey;
}
</style>
