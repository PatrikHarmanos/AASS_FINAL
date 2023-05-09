<template>
  <div class="q-pa-lg q-gutter-sm">
    <q-btn
      class="q-mr-lg"
      padding="xs"
      dense
      round
      flat
      color="grey"
      icon="delete"
      @click="createModal"
    />

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="modal-head text-white" style="width: 40%">
        <q-card-section>
          <div class="text-h6">{{ title }}</div>
        </q-card-section>

        <q-card-section class="bg-white text-black">
          <p class="text-bold">{{ message }}</p>

          <div class="row justify-center">
            <q-btn
              push
              class="q-ma-sm"
              unelevated
              color="red"
              text-color="white"
              :label="okButton"
              @click="_confirm"
            />

            <q-btn
              flat
              class="q-ma-sm"
              unelevated
              text-color="black"
              :label="cancelButton"
              @click="_cancel"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import {defineEmits, defineProps, ref} from 'vue';

const persistent = ref(false);

const title = ref('');
const message = ref('');
const okButton = ref('Áno');
const cancelButton = ref('Nie');

const emit = defineEmits(['yes']);
const props = defineProps({
  opts: {
    type: Object,
    default() {
      return {
        title: '',
        message: '',
      }
    }
  }
})

function createModal() {
  title.value = props.opts.title;
  message.value = props.opts.message;

  persistent.value = true;
}

function _confirm() {
  emit('yes');

  persistent.value = false;
}

function _cancel() {
  persistent.value = false;
}
</script>

<style scoped lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 40%;
}

.modal-head {
  background-color: red;
}
</style>
