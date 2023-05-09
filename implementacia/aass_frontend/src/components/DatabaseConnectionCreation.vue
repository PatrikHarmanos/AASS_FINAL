<template>
  <div class="q-pa-md q-gutter-sm">
    <q-btn
      v-if="create"
      push
      class="q-ma-sm"
      unelevated
      icon="add"
      color="secondary"
      text-color="white"
      label="Nová databáza"
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
          <div class="text-h5 text-bold">Registrácia novej databázy</div>
        </q-card-section>

        <q-card-section class="bg-white text-black">
          <div class="text-h6 text-black text-bold">Základné informácie</div>
          <q-input
            outlined
            v-model="name"
            label="Názov databázy"
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

          <q-separator inset />

          <div>
            <div class="input-field text-h6 text-black text-bold">
              Pripojenie
            </div>
            <div class="input-field row justify-between">
              <div style="width: 78%">
                <q-input
                  outlined
                  v-model="host"
                  label="Host"
                  type="text"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Pole nemôže byť prázdne!',
                  ]"
                />
              </div>
              <div class="q-mt-sm" v-if="registerErrors.hostErrors">
                <div
                  class="bad_data"
                  v-for="error in registerErrors.hostErrors"
                  :key="error"
                >
                  {{ error }}
                </div>
              </div>

              <div style="width: 18%">
                <q-input
                  outlined
                  v-model="port"
                  label="Port"
                  type="text"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Pole nemôže byť prázdne!',
                  ]"
                />
              </div>
            </div>
            <div class="q-mt-sm" v-if="registerErrors.portErrors">
              <div
                class="bad_data"
                v-for="error in registerErrors.portErrors"
                :key="error"
              >
                {{ error }}
              </div>
            </div>

            <div class="input-field row justify-between">
              <div style="width: 48%">
                <q-input
                  outlined
                  v-model="username"
                  label="Používateľské meno"
                  type="text"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Pole nemôže byť prázdne!',
                  ]"
                />
              </div>
              <div class="q-mt-sm" v-if="registerErrors.usernameErrors">
                <div
                  class="bad_data"
                  v-for="error in registerErrors.usernameErrors"
                  :key="error"
                >
                  {{ error }}
                </div>
              </div>

              <div style="width: 48%">
                <q-input
                  outlined
                  v-model="password"
                  label="Heslo"
                  type="password"
                  lazy-rules
                  :rules="[
                    (val) =>
                      (val && val.length > 0) || 'Pole nemôže byť prázdne!',
                  ]"
                />
              </div>
            </div>
            <div class="q-mt-sm" v-if="registerErrors.passwordErrors">
              <div
                class="bad_data"
                v-for="error in registerErrors.passwordErrors"
                :key="error"
              >
                {{ error }}
              </div>
            </div>

            <div class="input-field row" style="width: 48%">
              <q-input
                outlined
                v-model="database"
                label="Databáza"
                type="text"
                lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 0) || 'Pole nemôže byť prázdne!',
                ]"
              />
            </div>
            <div class="q-mt-sm" v-if="registerErrors.databaseErrors">
              <div
                class="bad_data"
                v-for="error in registerErrors.databaseErrors"
                :key="error"
              >
                {{ error }}
              </div>
            </div>

            <div class="row">
              <q-btn
                push
                class="q-ma-sm"
                unelevated
                color="secondary"
                text-color="white"
                label="Otestovať pripojenie"
                @click="test"
              />

              <div
                style="margin: 15px 0 0 15px"
                :class="success ? 'text-bold test_success' : 'text-bold test_fail'"
              >
                {{ connection }}
              </div>
            </div>
          </div>

          <q-separator inset />

          <q-file
            class="input-field"
            outlined
            v-model="schema"
            label="Obrázok schémy databázy"
            accept=".jpg, .png, .svg, image/*"
            counter
            :counter-label="updateLabel"
            max-files="1"
            style="max-width: 300px"
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
import { ref, computed, defineEmits, defineProps } from 'vue';
import { useDatabaseStore } from 'stores/database-store';
import { Notify } from 'quasar';

interface registerErrorsInterface {
  nameErrors: Array<string>;
  descErrors: Array<string>;
  hostErrors: Array<string>;
  portErrors: Array<string>;
  usernameErrors: Array<string>;
  passwordErrors: Array<string>;
  databaseErrors: Array<string>;
  schemaErrors: Array<string>;
}

const persistent = ref(false);

const emit = defineEmits(['reload']);
const props = defineProps({
  create: Boolean,
  data: {
    type: Object,
    default() {
      return {
        connection_name: '',
        description: '',
        host: '',
        port: '',
        database: '',
        username: '',
        schema: null,
      };
    },
  },
});

const schema = ref(new Blob());
const connection = ref('');
const success = ref(false);

const name = ref('');
const description = ref('');
const host = ref('');
const port = ref('5432');
const username = ref('');
const password = ref('');
const database = ref('');

const verify_name = ref();
const verify_desc = ref();
const verify_host = ref();
const verify_port = ref();
const verify_username = ref();
const verify_password = ref();
const verify_database = ref();

const databaseStore = useDatabaseStore();

// computed properties
const registerErrors = computed<registerErrorsInterface>(() => databaseStore.registerErrors);

function createModal() {
  if (!props.create) {
    name.value = props.data?.connection_name;
    description.value = props.data?.description;
    host.value = props.data?.host;
    port.value = props.data?.port;
    username.value = props.data?.username;
    database.value = props.data?.database;
    schema.value = props.data?.schema;
  }

  persistent.value = true;
}

function emptyString(str: string) {
  return str !== '';
}

function updateLabel({
  totalSize,
  filesNumber,
  maxFiles,
}: {
  totalSize: number;
  filesNumber: number;
  maxFiles: number;
}): string {
  return `${totalSize}`;
}

function test() {
  let data = {
    connection_name: name.value,
    database: database.value,
    host: host.value,
    port: port.value,
    username: username.value,
    password: password.value,
  }

  databaseStore.testDatabase(JSON.stringify(data)).then(() => {
    if (databaseStore.testStatus === 200) {
      success.value = true;
      connection.value = 'Pripojenie prebehlo úspešne!';
    }
    else {
      success.value = false;
      connection.value = 'Pripojenie zlyhalo!';
    }
  });
}

// Z nejakeho skurveneho dovodu to nereloadne tu tabulku aj ked som to spravil uplne rovnako ako pri ostatnych
// tabulkach takze na to jebem a komu sa to chce riesit kupim pivo lebo na tieto kokotiny nemam cas
// A autocorrect vo webstorm moze ist tiez dopici
function register(): void {
  let data = new FormData();

  data.append('connection_name', name.value);
  data.append('description', description.value);
  data.append('host', host.value);
  data.append('port', port.value);
  data.append('username', username.value);
  data.append('password', password.value);
  data.append('database', database.value);
  data.append('schema_img', schema.value);

  databaseStore.registerDatabase(data).then((res) => {
    console.log(res);

    if (databaseStore.registerErrors.nameErrors.length == 0 &&
      databaseStore.registerErrors.descErrors.length == 0 &&
      databaseStore.registerErrors.hostErrors.length == 0 &&
      databaseStore.registerErrors.portErrors.length == 0 &&
      databaseStore.registerErrors.usernameErrors.length == 0 &&
      databaseStore.registerErrors.passwordErrors.length == 0 &&
      databaseStore.registerErrors.databaseErrors.length == 0 &&
      databaseStore.registerErrors.schemaErrors.length == 0) {
      Notify.create({
        message: 'Databázové pripojenie bolo úspešne vytvorené.',
        position: 'top-right',
        type: 'positive',
      });
    }

    databaseStore.fetchDatabaseList();
  });
}

function update(): void {
  let data = new FormData();

  data.append('connection_name', name.value);
  data.append('description', description.value);
  data.append('host', host.value);
  data.append('port', port.value);
  data.append('username', username.value);
  data.append('password', password.value);
  data.append('database', database.value);
  data.append('schema_img', schema.value);

  databaseStore.updateDatabase(props.data.id, data).then((res) => {
    console.log(res);

    if (databaseStore.registerErrors.nameErrors.length == 0 &&
      databaseStore.registerErrors.descErrors.length == 0 &&
      databaseStore.registerErrors.hostErrors.length == 0 &&
      databaseStore.registerErrors.portErrors.length == 0 &&
      databaseStore.registerErrors.usernameErrors.length == 0 &&
      databaseStore.registerErrors.passwordErrors.length == 0 &&
      databaseStore.registerErrors.databaseErrors.length == 0 &&
      databaseStore.registerErrors.schemaErrors.length == 0) {
      Notify.create({
        message: 'Databázové pripojenie bolo úspešne upravené.',
        position: 'top-right',
        type: 'positive',
      });
    }

    databaseStore.fetchDatabaseList();
  });
}

function checkData() {
  verify_name.value = emptyString(name.value);
  verify_desc.value = emptyString(description.value);
  verify_host.value = emptyString(host.value);
  verify_port.value = emptyString(port.value);
  verify_username.value = emptyString(username.value);
  verify_password.value = emptyString(password.value);
  verify_database.value = emptyString(database.value);

  if (
    verify_name.value === true &&
    verify_desc.value === true &&
    verify_host.value === true &&
    verify_port.value === true &&
    verify_username.value === true &&
    verify_password.value === true &&
    verify_database.value === true &&
    schema.value !== null
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
  description.value = '';
  host.value = '';
  port.value = '';
  username.value = '';
  password.value = '';
  database.value = '';

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

.bad-data, .test_fail {
  color: red;
}

.test_success {
  color: green;
}
</style>
