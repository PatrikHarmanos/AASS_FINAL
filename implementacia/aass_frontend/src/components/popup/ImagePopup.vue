<template>
  <div class="q-pa-lg q-gutter-sm">
    <q-btn
      class="q-mr-lg"
      padding="xs"
      dense
      round
      flat
      color="grey"
      icon="image"
      @click="persistent = true"
    />

    <q-dialog
      v-model="persistent"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="modal-head text-white" style="width: 60%">
        <q-card-section class="bg-white text-black">
          <q-img :src="'http://localhost:8000/' + props.path" />
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';

const persistent = ref(false);

const props = defineProps({
  path: String,
  default() {
    return {
      path: '',
    };
  },
});
</script>

<style lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 80%;
}

.modal-head {
  background-color: $primary;
}

.input-field {
  margin-top: 15px;
}

.bad-data {
  color: red;
}
</style>
