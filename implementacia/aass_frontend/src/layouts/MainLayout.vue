<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar class="row justify-between items-center">
        <div class="row items-center">
          <q-btn @click="$router.push('/')" flat>
            <q-img src="sql.svg" width="20px" class="q-mr-xs" />
            <p class="q-mb-none q-ml-sm text-bold">Edu-Hub</p>
          </q-btn>
        </div>
        <language-switch />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import languageSwitch from '../components/layouts/LanguageSwitch.vue';
</script>
