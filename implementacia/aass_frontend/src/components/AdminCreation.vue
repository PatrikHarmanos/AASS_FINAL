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
      label="Nový admin"
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
      persistent
      transition-show="scale"
      transition-hide="scale"
    >
      <q-card class="modal-head text-white" style="width: 60%">
        <q-card-section>
          <div class="text-h6">Registrácia nového admina</div>
        </q-card-section>

        <q-card-section class="bg-white text-black">
          <q-input
            outlined
            v-model="name"
            label="Meno a priezvisko"
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

          <div class="input-field row">
            <q-input
              style="width: 68%"
              outlined
              v-model="email"
              label="E-mail"
              type="email"
              lazy-rules
              :rules="[ val => val && isEmail(val) || 'E-mailová adresa nie je v správnom tvare!' ]"
            />
            <div class="q-mt-sm" v-if="registerErrors.emailErrors">
              <div
                class="bad_data"
                v-for="error in registerErrors.emailErrors"
                :key="error"
              >
                {{ error }}
              </div>
            </div>

            <q-checkbox
              style="width: 28%; margin: 0 0 15px 20px"
              v-model="ais"
              label="Prihlasovanie cez AIS"
            />
          </div>

          <q-input
            class="input-field"
            outlined
            v-model="password"
            label="Heslo"
            type="text"
            :disable="ais"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Pole nemôže byť prázdne!' ]"
          />
          <div class="q-mt-sm" v-if="registerErrors.passwordErrors">
            <div
              class="bad_data"
              v-for="error in registerErrors.passwordErrors"
              :key="error"
            >
              {{ error }}
            </div>
          </div>

          <q-input
            class="input-field"
            outlined
            v-model="password_confirm"
            label="Potvrdenie hesla"
            type="text"
            :disable="ais"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Pole nemôže byť prázdne!' ]"
          />
          <div class="q-mt-sm" v-if="registerErrors.passwordErrors">
            <div
              class="bad_data"
              v-for="error in registerErrors.passwordErrors"
              :key="error"
            >
              {{ error }}
            </div>
          </div>

          <q-select
            class="input-field"
            outlined
            v-model="courses"
            :options="course_options"
            multiple
            use-chips
            stack-label
            label="Priradené kurzy"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Musí byť priradený aspoň jeden kurz!' ]"
          />

          <q-select
            class="input-field"
            outlined
            v-model="permissions"
            :options="permission_options"
            multiple
            use-chips
            stack-label
            label="Priradené povolenia"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Musí byť priradené aspoň jedno povolenie!' ]"
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
          {{data}}
        </q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineEmits, defineProps } from 'vue'
import { useAdminStore } from 'stores/admin-store';
import { Notify } from 'quasar';

interface registerErrorsInterface {
  nameErrors: Array<string>;
  emailErrors: Array<string>;
  passwordErrors: Array<string>;
}

const persistent = ref(false);
const course_options = [ 'DBS', 'PDT' ];
const permission_options = [ 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'TRUNCATE', 'GRANT', 'CREATE TABLE', 'CREATE VIEW' ]

const emit = defineEmits(['reload']);
const props = defineProps({
  create: Boolean,
  data: {
    type: Object,
    default() {
      return {
        name: '',
        email: '',
        is_ais_login: '',
        courses: [{
          id: '',
          name: '',
          name_en: '',
          description: '',
          description_en: '',
          start_at: '',
          end_at: '',
        }],
        permissions: [],
      }
    }
  }
})

const name = ref('');
const email = ref('');
const ais = ref(false);
const password = ref('');
const password_confirm = ref('');
const courses = ref([]);
const permissions = ref([ 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE TABLE', 'CREATE VIEW' ]);

const verify_name = ref();
const verify_email = ref();
const verify_password = ref();
const verify_courses = ref();
const verify_permissions = ref();

function createModal() {
  if (!props.create) {
    name.value = props.data?.name;
    email.value = props.data?.email;
    ais.value = props.data?.is_ais_login;
    courses.value = props.data?.kurz;
    permissions.value = props.data?.permissions;
  }

  persistent.value = true;
}

function emptyString(str: string) {
  return str !== '';
}

function emptyList(len: number) {
  return len > 0;
}

function isEmail(str: string) {
  const at = /[ `@]/;
  const dot = /[ `.]/;
  return at.test(str) && dot.test(str) && emptyString(str);
}

const adminStore = useAdminStore();

// computed properties
const registerErrors = computed<registerErrorsInterface>(() => adminStore.registerErrors);

function register(): void {
  let data = {
    name: name.value,
    email: email.value,
    is_ais_login: ais.value,
    password: password.value,
    confirm_password: password_confirm.value,
    courses: courses.value,
    permissions: permissions.value,
  };

  adminStore.register(JSON.stringify(data)).then((res) => {
    console.log(res);

    if (adminStore.registerErrors.nameErrors.length == 0 &&
      adminStore.registerErrors.passwordErrors.length == 0 &&
      adminStore.registerErrors.emailErrors.length == 0) {
      Notify.create({
        message: 'Admin účet bol úspešne vytvorený.',
        position: 'top-right',
        type: 'positive',
      });
    }
  });
}

function checkData(): void {
  verify_name.value = emptyString(name.value);
  verify_email.value = isEmail(email.value);
  verify_password.value = ais.value || (emptyString(password.value) && emptyString(password_confirm.value) && password.value === password_confirm.value);
  verify_courses.value = emptyList(courses.value.length);
  verify_permissions.value = emptyList(permissions.value.length);

  if (verify_name.value === true &&
      verify_email.value === true &&
      verify_password.value === true &&
      verify_courses.value === true &&
      verify_permissions.value === true) {

    register();
    emit('reload');
    persistent.value = false;
  }
}

function cancel(): void {
  name.value = '';
  email.value = '';
  password.value = '';
  courses.value = [];
  permissions.value = [ 'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'DROP', 'CREATE TABLE', 'CREATE VIEW' ];

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
  margin-top: 25px;
}

.bad-data {
  color: red;
}
</style>
