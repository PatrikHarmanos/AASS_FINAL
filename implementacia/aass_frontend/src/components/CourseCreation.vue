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
      label="Nový kurz"
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
          <div class="text-h6">Registrácia nového kurzu</div>
        </q-card-section>

        <q-card-section class="bg-white text-black">
          <q-input
            outlined
            v-model="name"
            label="Názov kurzu"
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
            label="Anglický názov"
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
            v-model="description"
            label="Popis"
            type="textarea"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Pole nemôže byť prázdne!',
            ]"
          />
          <div class="q-mt-sm" v-if="registerErrors.descErrors">
            <div
              class="bad_data"
              v-for="error in registerErrors.descErrors"
              :key="error"
            >
              {{ error }}
            </div>
          </div>

          <q-input
            class="input-field"
            outlined
            v-model="description_en"
            label="Anglický popis"
            type="textarea"
            lazy-rules
            :rules="[
              (val) => (val && val.length > 0) || 'Pole nemôže byť prázdne!',
            ]"
          />
          <div class="q-mt-sm" v-if="registerErrors.descErrors">
            <div
              class="bad_data"
              v-for="error in registerErrors.descErrors"
              :key="error"
            >
              {{ error }}
            </div>
          </div>

          <q-date
            v-model="date_range"
            mask="YYYY-MM-DD"
            today-btn
            range
            landscape
            @update:model-value="updateDate"
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
import { computed, ref, defineEmits, defineProps } from 'vue';
import { useCourseStore } from 'stores/course-store';
import { Notify } from 'quasar';
import { useAdminStore } from 'src/stores/admin-store';

interface registerErrorsInterface {
  nameErrors: Array<string>;
  descErrors: Array<string>;
  emailErrors: Array<string>;
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
        description: '',
        description_en: '',
        start_at: '',
        end_at: '',
      };
    },
  },
});

const name = ref('');
const name_en = ref('');
const description = ref('');
const description_en = ref('');
const date_range = ref();

const verify_name = ref();
const verify_desc = ref();

const courseStore = useCourseStore();
const adminStore = useAdminStore();

// computed properties
const registerErrors = computed<registerErrorsInterface>(
  () => courseStore.registerErrors
);

function createModal() {
  let today = new Date();

  today.setDate(today.getDate() + (1 + 7 - today.getDay()) % 7);
  let today_str = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  today.setDate(today.getDate() + 12 * 7 - 1);
  let end_str = today.getFullYear() + '-' + String(today.getMonth() + 1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0');

  date_range.value = {
    from: today_str,
    to: end_str
  };

  if (!props.create) {
    name.value = props.data?.name;
    name_en.value = props.data?.translations.name_en;
    description.value = props.data?.description;
    description_en.value = props.data?.translations.description_en;
    date_range.value = { from: props.data?.start_at, to: props.data?.end_at };
  }

  persistent.value = true;
}

function updateDate() {
  let start = date_range.value['from'];
  let end_date = new Date(start);
  end_date.setDate(end_date.getDate() + 12 * 7 - 1);
  let end = end_date.getFullYear() + '-' + String(end_date.getMonth() + 1).padStart(2, '0') + '-' + String(end_date.getDate()).padStart(2, '0');

  date_range.value = {
    from: start,
    to: end
  };
}

function emptyString(str: string) {
  return str !== '';
}

function register(): void {
  let data = {
    name: name.value,
    name_en: name_en.value,
    description: description.value,
    description_en: description_en.value,
    start_at: date_range.value['from'],
    end_at: date_range.value['to'],
  };

  courseStore.registerCourse(JSON.stringify(data)).then((res) => {
    console.log(res);

    if (courseStore.registerErrors.nameErrors.length == 0 &&
      courseStore.registerErrors.descErrors.length == 0 &&
      courseStore.registerErrors.emailErrors.length == 0) {
      Notify.create({
        message: 'Kurz bol úspešne vytvorený.',
        position: 'top-right',
        type: 'positive',
      });
    }

    adminStore.getCourses();
  });
}

function update(): void {
  let data = {
    name: name.value,
    name_en: name_en.value,
    description: description.value,
    description_en: description_en.value,
    start_at: date_range.value['from'],
    end_at: date_range.value['to'],
  };

  courseStore.updateCourse(props.data.id, JSON.stringify(data)).then((res) => {
    console.log(res);

    if (courseStore.registerErrors.nameErrors.length == 0 &&
      courseStore.registerErrors.descErrors.length == 0 &&
      courseStore.registerErrors.emailErrors.length == 0) {
      Notify.create({
        message: 'Kurz bol úspešne upravený.',
        position: 'top-right',
        type: 'positive',
      });
    }

    adminStore.getCourses();
  });
}

function checkData() {
  verify_name.value = emptyString(name.value) && emptyString(name_en.value);
  verify_desc.value = emptyString(description.value) && emptyString(description_en.value);

  if (
    verify_name.value === true &&
    verify_desc.value === true
  ) {
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
  description.value = '';
  description_en.value = '';

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
