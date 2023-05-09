<template>
  <div class="q-pa-lg q-gutter-sm">
    <q-btn
      push
      class="q-ma-sm"
      unelevated
      icon="add"
      color="secondary"
      text-color="white"
      label="Nový štítok"
      @click="persistent = true"
    />

    <q-dialog
      v-model="persistent"
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="modal-head text-white" style="width: 60%">
        <q-card-section>
          <div class="text-h6 text-bold">Tvorba nového štítku</div>
        </q-card-section>

        <q-card-section class="bg-white text-black">
          <q-input
            outlined
            v-model="name"
            label="Názov štítku"
            type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Pole nemôže byť prázdne!' ]"
          />
          <div class="q-mt-sm" v-if="registerErrors.nameErrors">
            <div
              class="bad_data"
              v-for="error in registerErrors.nameErrors"
              :key="error"
            >
              {{ error }}
            </div>
          </div>

          <q-input class="input-field"
            outlined
            v-model="eng_name"
            label="Anglický názov"
            type="text"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Pole nemôže byť prázdne!' ]"
          />
          <div class="q-mt-sm" v-if="registerErrors.nameErrors">
            <div
              class="bad_data"
              v-for="error in registerErrors.nameErrors"
              :key="error"
            >
              {{ error }}
            </div>
          </div>

          <q-color
            v-model="color"
            default-value="#285de0"
          />

          <div align="right">
            <q-btn
              flat
              class="q-ma-sm"
              unelevated
              text-color="primary"
              label="Cancel"
              @click="cancel"
            />

            <q-btn
              push
              class="q-ma-sm"
              unelevated
              color="primary"
              text-color="white"
              label="Submit"
              @click="checkData"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTagStore } from 'stores/tag-store';

interface registerErrorsInterface {
  nameErrors: Array<string>;
}

const persistent = ref(false);

const name = ref('');
const eng_name = ref('');
const color = ref('');

const verify_name = ref();

function emptyString(str: string) {
  return str !== '';
}

const tagStore = useTagStore();

// computed properties
const registerErrors = computed<registerErrorsInterface>(() => tagStore.tagRegisterErrors);

function create(): void {
  let data = {
    name: name.value,
    name_en: eng_name.value,
    color: color.value
  };

  console.log(data);

  tagStore.createTag(JSON.stringify(data)).then((res) => {
    console.log(res);
  });
}

function checkData() {
  verify_name.value = emptyString(name.value) && emptyString(eng_name.value);

  if (verify_name.value === true) {
    create();

    persistent.value = false;
  }
}

function cancel() {
  name.value = '';
  eng_name.value = '';
  color.value = '';

  persistent.value = false;
}
</script>

<style lang="scss">
.q-dialog__inner--minimized > div {
  max-width: 40%;
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
