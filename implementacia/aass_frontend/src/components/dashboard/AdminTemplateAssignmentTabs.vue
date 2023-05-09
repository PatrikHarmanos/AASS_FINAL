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
          label="Zadanie"
          class="tab"
        />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated style="height: calc(100% - 40px)">
        <q-tab-panel name="description" class="row"  style=" padding-bottom: 0; width: 100%">
          <div class="text-black" style="width: 50%; padding: 20px" >
            <q-input outlined v-model="text" label="Názov úlohy" />
            <div class="q-py-md">
                <q-input
                v-model="text"
                type="textarea"
                outlined
                label="Zadanie úlohy"
                />
            </div>
            <div class="q-py-md">
                <q-input
                v-model="text"
                type="textarea"
                outlined
                label="Nápoveda"
                />
            </div>
              <q-select outlined v-model="model" :options="options" label="Týždeň" style="padding-top: 10px; padding-bottom: 10px;"/>
              <q-select outlined v-model="model" :options="options" label="Štítok" style="padding-top: 10px; padding-bottom: 10px;"/>
          </div>
          <q-separator vertical />
          <div class="q-mt-xl" style="width: 48%; padding: 20px">
          <q-input outlined v-model="text" label="Anglický názov úlohy" />
            <div class="q-py-md">
                <q-input
                v-model="text"
                type="textarea"
                outlined
                label="Anglické zadanie úlohy"
                />
            </div>
            <div class="q-py-md">
                <q-input
                v-model="text"
                type="textarea"
                outlined
                label="Anglická nápoveda"
                />
            </div>
            <div class="text-h6 text-black text-bold">Schéma</div>
                <q-select outlined v-model="model" :options="options" label="Databáza" style="padding-top: 10px; padding-bottom: 10px;"/>
            <div>
              <viewer
                :images="images"
                :options="{
                  inline: false,
                  title: false,
                  rotatable: false,
                  toolbar: false,
                  navigator: false,
                  navbar: false,
                }"
              >
                <q-img
                  v-for="src in images"
                  :key="src"
                  :src="src"
                  fit="scale-down"
                  class="schema-img"
                />
              </viewer>
            </div>
          </div>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useMainStore } from '../../stores/main-store';

const mainStore = useMainStore();
const tab = ref('description');

const images = ['schema_db0.png'];
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
