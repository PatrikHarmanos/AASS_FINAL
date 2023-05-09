<template>
  <q-page class="row items-center justify-center">
    <div style="width: 50%">
      <div>
        <q-btn
          @click="$router.push('/admin')"
          push
          color="primary"
          icon="arrow_back"
          align="center"
          class="q-mt-md"
        >
          <div>Späť</div>
        </q-btn>
      </div>
      <h5 class="q-mb-md q-mt-md">Nová úloha</h5>
      <q-input outlined v-model="title" label="Názov úlohy" class="q-mb-md" />
      <q-input
        v-model="description"
        type="textarea"
        outlined
        label="Zadanie úlohy"
        class="q-mb-md"
      />
      <!-- <div class="q-mb-md row justify-between">
        <q-select
          outlined
          v-model="selectedWeek"
          :options="weeks"
          label="Týždeň"
          style="width: 49%"
          :disable="selectWeeksActive ? false : true"
        />
      </div> -->
      <div class="row justify-end q-mb-md q-mt-md">
        <q-btn
          push
          class="q-ma-sm"
          unelevated
          color="primary"
          text-color="white"
          label="Vytvoriť úlohu"
          @click="checkData"
        />
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from 'src/stores/auth-store';

const router = useRouter();

const authStore = useAuthStore();

const title = ref('');
const description = ref('');

function checkData() {
  let data = {
    title: title.value,
    description: description.value,
  };

  authStore.createTask(data);

  router.push('/admin');
}
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

.queryErrorMessage {
  color: red;
  font-size: 15px;
  font-weight: 500;
}

.queryExecutionTimeBox {
  font-size: 15px;
  color: black;
  padding: 8px;
  border-radius: 7px;
  font-weight: bold;
  background-color: #fafafa;
  width: fit-content;
  margin-bottom: 20px;
}
</style>
