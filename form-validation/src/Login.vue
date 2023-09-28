<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import { storeToRefs } from 'pinia';

import useUserStore from './userStore';

const username = ref('');
const password = ref('');
const userStore = useUserStore();
const { user, error } = storeToRefs(userStore);

const handleAuth = async () => {
  await userStore.login({
    username: username.value,
    password: password.value,
  });
};
</script>

<template>
  <h1 v-if="user">Hello, {{ user.name }}</h1>

  <form @submit.prevent="handleAuth">
    <input v-model="username" role="username" />
    <input v-model="password" role="password" />
    <button>Click here to sign in</button>
  </form>

  <span v-if="error">{{ error }}</span>
</template>
