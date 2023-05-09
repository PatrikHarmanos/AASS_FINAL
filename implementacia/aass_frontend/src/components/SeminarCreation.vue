<template>
  <div class="q-pa-lg q-gutter-sm">
    <q-btn
      v-if="create"
      push
      class="q-ma-sm"
      unelevated
      icon="add"
      color="secondary"
      text-color="white"
      label="Nové cvičenie"
      @click="createModal"
    />

    <q-btn
      v-else
      class="q-mr-lg"
      padding="xs"
      dense
      round
      flat
      color="grey"
      icon="edit"
      @click="createModal"
    />

    <q-dialog
      v-model="persistent"
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="modal-head text-white" style="width: 60%">
        <q-card-section>
          <div class="text-h6">Registrácia nového semináru</div>
        </q-card-section>

        <q-card-section class="bg-white text-black">
          <q-input
            outlined
            v-model="name"
            label="Názov semináru"
            type="text"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Pole nemôže byť prázdne!',
            ]"
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

          <q-input
            class="input-field"
            outlined
            v-model="name_en"
            label="Anglický názov semináru"
            type="text"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Pole nemôže byť prázdne!',
            ]"
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

          <q-select
            class="input-field"
            outlined
            v-model="course"
            :options="options"
            label="Kurz"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Musí byť vybraný kurz!',
            ]"
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
import { computed, ref } from 'vue';
import { useSeminarStore } from 'stores/seminar-store';
import { useAdminStore } from 'stores/admin-store';
import { Notify } from 'quasar';

interface registerErrorsInterface {
  nameErrors: Array<string>;
}

const persistent = ref(false);

const emit = defineEmits(['reload']);
const props = defineProps({
  create: Boolean,
  data: {
    type: Object,
    default() {
      return {
        name: '',
        name_en: '',
        course: {
          id: '',
          name: '',
          name_en: '',
          start_at: '',
          end_at: '',
        },
      };
    },
  },
});

const name = ref('');
const name_en = ref('');
const course = ref('');

const verify_name = ref();
const verify_course = ref();

const seminarStore = useSeminarStore();
const adminStore = useAdminStore();

// computed properties
const registerErrors = computed<registerErrorsInterface>(
  () => seminarStore.registerErrors
);
const options = computed<Array<string>>(() =>
  adminStore.courses.map((x) => x.name)
);

function createModal() {
  adminStore.getCourses();

  if (!props.create) {
    name.value = props.data?.name;
    name_en.value = props.data?.translations.name_en;
    course.value = props.data?.course.name;
  }

  persistent.value = true;
}

function emptyString(str: string) {
  return str !== '';
}

function register(): void {
  let _course = '';
  let _course_start = '';

  for (let x of adminStore.courses) {
    console.log(x.name);
    if (x.name === course.value) {
      _course = x.id;
      _course_start = x.start_at;
    }
  }

  let data = {
    name: name.value,
    name_en: name_en.value,
    course_id: _course,
    start_at: _course_start,
  };

  seminarStore.registerSeminar(JSON.stringify(data)).then((res) => {
    console.log(res);

    if (seminarStore.registerErrors.nameErrors.length == 0) {
      Notify.create({
        message: 'Seminár bol úspešne vytvorený.',
        position: 'top-right',
        type: 'positive',
      });
    }

    seminarStore.fetchSeminars();
  });
}

function update(): void {
  let _course = '';
  let _course_start = '';
  for (let x of adminStore.courses) {
    console.log(x.name);
    if (x.name === course.value) {
      _course = x.id;
      _course_start = x.start_at;
    }
  }

  let data = {
    name: name.value,
    name_en: name_en.value,
    course_id: _course,
    start_at: _course_start,
  };

  seminarStore
    .updateSeminar(props.data.id, JSON.stringify(data))
    .then((res) => {
      console.log(res);

      if (seminarStore.registerErrors.nameErrors.length == 0) {
        Notify.create({
          message: 'Seminár bol úspešne upravený.',
          position: 'top-right',
          type: 'positive',
        });
      }

      seminarStore.fetchSeminars();
    });
}

function checkData() {
  verify_name.value = emptyString(name.value) && emptyString(name_en.value);
  verify_course.value = emptyString(course.value);

  if (verify_name.value === true && verify_course.value === true) {
    if (props.create === true) {
      register();
    } else {
      update();
    }

    emit('reload');
    persistent.value = false;
  }
}

function cancel() {
  name.value = '';
  name_en.value = '';
  course.value = '';

  persistent.value = false;
}
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
