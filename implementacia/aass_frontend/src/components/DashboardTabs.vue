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
        />
        <q-tab style="height: 40px" name="stats" :label="$t('stats')" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="description">
          <div class="text-h6 text-black">{{ $t('assignment') }}</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="stats">
          <div class="text-h6 text-black">{{ $t('stats') }}</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>
    </q-card>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps } from 'vue';

const tab = ref('description');

const props = defineProps({
  task: Object,
});
</script>
