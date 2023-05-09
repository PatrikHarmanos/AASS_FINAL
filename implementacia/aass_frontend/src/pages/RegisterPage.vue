<template>
  <q-page class="page row items-center justify-center">
    <div class="main_div items-center justify-center">
      <div>
        <h3 class="heading column items-center">{{ $t('signUp') }}</h3>
      </div>
      <div class="data items-center justify-center">
        <q-input
          class="label"
          outlined
          v-model="name"
          type="text"
          :label="$t('name')"
          :dense="dense"
        />

        <q-input
          class="label"
          outlined
          v-model="surname"
          type="text"
          :label="$t('surname')"
          :dense="dense"
        />

        <q-input
          class="label"
          outlined
          v-model="email"
          type="email"
          :label="$t('labelEmail')"
          :dense="dense"
        />

        <q-input
          class="label"
          outlined
          v-model="password"
          type="password"
          :label="$t('password')"
          :dense="dense"
        />
      </div>
      <div class="column items-center justify-center">
        <q-btn class="button" @click="checkData">Vytvorit ucet</q-btn>
      </div>

      <div class="row justify-center">
        <p class="q-mr-sm">{{ $t('alreadyHaveAccount') }}</p>
        <a href="/#/login">{{ $t('signIn') }}</a>
      </div>
    </div>
  </q-page>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth-store';
import { Notify } from 'quasar';
const authStore = useAuthStore();

const dense = ref(false);
const router = useRouter();

const name = ref('');
const surname = ref('');
const email = ref('');
const password = ref('');

function checkData() {
  let data = {
    name: name.value + surname.value,
    is_admin: true,
    email: email.value,
    password: password.value,
    password_confirmation: password.value,
  };

  authStore.register(JSON.stringify(data)).then((res) => {
    console.log(res);
    Notify.create({
      message: 'Účet bol úspešne vytvorený.',
      position: 'top-right',
      type: 'positive',
    });
    router.push('/dashboard');
  });
}
</script>

<style scoped lang="scss">
.page {
  background-color: #f0f6fb;
}
.heading {
  margin-bottom: 20px;
  color: #064789;
}
.main_div {
  width: 40%;
  border-radius: 25px;
  background-color: white;
  box-shadow: 8px 8px 18px 10px rgba(216, 216, 216, 0.916);
  padding: 50px;
  padding-top: 0px;
  margin-top: 2%;
  margin-bottom: 2%;
}
.label {
  margin-top: 25px;
}
.bad_data {
  color: red;
}
.button {
  color: #ebf2fa;
  background-color: #064789;
  margin-top: 20px;
  margin-bottom: 0px;
}
</style>
