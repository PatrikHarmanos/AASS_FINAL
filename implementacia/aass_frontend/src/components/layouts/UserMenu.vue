<template>
  <q-btn unelevated color="primary" icon="person" class="oco">
    <q-menu>
      <div style="width: 270px">
        <q-list>
          <q-item class="row items-center justify-start q-pa-sm">
            <q-avatar
              size="50px"
              font-size="35px"
              color="primary"
              text-color="white"
              icon="person"
              class="q-mr-md q-ml-sm"
            />
            <div class="column items-start justify-center">
              <div class="text-bold">
                {{ authStore.user.first_name }} {{ authStore.user.last_name }}
              </div>
              <div class="email">{{ authStore.user.email }}</div>
            </div>
          </q-item>
          <q-separator />
          <div
            v-if="!authStore.isAdmin"
            class="column items-center justify-around q-py-md"
          >
            <div class="row justify-center">
              <q-btn
                push
                @click="$router.push('/courses')"
                color="secondary"
                icon="widgets"
                align="left"
                style="width: 230px"
              >
                <div
                  class="row items-center justify-between q-ml-sm"
                  style="width: 82%"
                >
                  <div>{{ $t('subjects') }}</div>
                  <div><q-icon name="chevron_right" size="23px" /></div>
                </div>
              </q-btn>
            </div>
            <div
              class="row justify-center q-my-sm"
              v-if="$route.fullPath !== '/courses'"
            >
              <q-btn
                @click="$router.push('/courses/' + $route.params.id)"
                push
                color="secondary"
                icon="calendar_month"
                align="left"
                style="width: 230px"
              >
                <div
                  class="row items-center justify-between q-ml-sm"
                  style="width: 82%"
                >
                  <div>{{ $t('overviewWeeks') }}</div>
                  <div><q-icon name="chevron_right" size="23px" /></div>
                </div>
              </q-btn>
            </div>
            <div
              class="row justify-center"
              v-if="$route.fullPath !== '/courses'"
            >
              <q-btn
                push
                color="secondary"
                icon="leaderboard"
                align="left"
                style="width: 230px"
              >
                <div
                  class="row items-center justify-between q-ml-sm"
                  style="width: 82%"
                >
                  <div>{{ $t('leaderboard') }}</div>
                  <div><q-icon name="chevron_right" size="23px" /></div>
                </div>
              </q-btn>
            </div>
          </div>
          <div v-else>
            <div class="row justify-center q-my-md">
              <q-btn
                push
                @click="$router.push('/admin')"
                color="secondary"
                icon="widgets"
                align="left"
                style="width: 230px"
              >
                <div
                  class="row items-center justify-between q-ml-sm"
                  style="width: 82%"
                >
                  <div>Dashboard</div>
                  <div><q-icon name="chevron_right" size="23px" /></div>
                </div>
              </q-btn>
            </div>
          </div>
          <q-separator />
          <!--<q-item clickable v-close-popup style="height: 50px">
            <div class="row items-center jutify-center">
              <q-icon name="o_settings" size="23px" class="q-mr-sm" />
              <div>{{ $t('resetPassword') }}</div>
            </div>
          </q-item>-->
          <!--<q-item
            clickable
            v-close-popup
            class="row item-center justify-between"
            style="height: 50px"
          >
            <div class="row items-center jutify-center">
              <q-icon name="o_mode_night" size="23px" class="q-mr-sm" />
              <div>{{ $t('darkMode') }}</div>
            </div>
            <q-toggle v-model="mainStore.darkMode" color="secondary" />
          </q-item>-->
          <q-item
            clickable
            @click="bug = true"
            v-close-popup
            style="height: 50px"
          >
            <div class="row items-center jutify-center">
              <q-icon name="o_bug_report" size="23px" class="q-mr-sm" />
              <div>{{ $t('reportBug') }}</div>
            </div>
          </q-item>
          <q-item clickable @click="logout" v-close-popup style="height: 50px">
            <div class="row items-center jutify-center">
              <q-icon name="logout" size="23px" class="q-mr-sm" />
              <div>{{ $t('signOut') }}</div>
            </div>
          </q-item>
        </q-list>
      </div>
    </q-menu>
  </q-btn>

  <q-dialog v-model="bug">
    <q-card style="min-width: 700px">
      <q-card-section>
        <div class="text-h6">Nahlásiť bug</div>
      </q-card-section>

      <q-card-section class="q-pt-none">
        Prosím, popíš nám čo sa stalo...
      </q-card-section>

      <q-card-section class="q-pt-none">
        <form ref="form" @submit.prevent="sendEmail">
          <q-input
            v-model="bug_message"
            name="message"
            type="textarea"
            required
          />

          <q-card-actions align="right">
            <q-btn
              flat
              label="Zavrieť"
              color="primary"
              v-close-popup
              @click="bug_message = ''"
            />
            <q-btn flat type="submit" label="Odoslať" v-close-popup />
          </q-card-actions>
        </form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth-store';
import { useMainStore } from '../../stores/main-store';
import { useRoute } from 'vue-router';
import emailjs from 'emailjs-com';

const authStore = useAuthStore();
const mainStore = useMainStore();
const model = ref(false);
const route = useRoute();
const bug = ref(false);
const bug_message = ref('');
const form = ref(null);

function sendEmail(e: Event) {
  emailjs
    .sendForm(
      'service_q7446uu',
      'template_qfi55ih',
      form.value,
      'xdSvOTbrMIq_HVFZG'
    )
    .then(
      (result) => {
        console.log(result.text);
      },
      (error) => {
        console.log(error.text);
      }
    );
  bug_message.value = '';
}

console.log(route.fullPath);

function logout() {
  authStore.logout();
}
</script>

<style>
.email {
  max-width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
