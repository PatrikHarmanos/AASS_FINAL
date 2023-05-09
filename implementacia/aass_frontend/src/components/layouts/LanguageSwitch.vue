<template>
  <div class="locale-changer row">
    <div v-if="$i18n.locale == 'en-US'">
      <q-btn
        @click="
          $i18n.locale = 'sk-SK';
          Cookies.set('lang', 'sk-SK');
        "
        flat
      >
        <q-img src="slovakia-flag-icon.svg" width="30px" class="q-mr-xs" />
      </q-btn>
    </div>
    <div v-else>
      <q-btn
        @click="
          $i18n.locale = 'en-US';
          Cookies.set('lang', 'en-US');
        "
        flat
      >
        <q-img
          src="united-kingdom-flag-icon.svg"
          width="30px"
          class="q-mr-xs"
        />
      </q-btn>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Cookies } from 'quasar';
</script>
