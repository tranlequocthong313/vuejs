<script setup lang="ts">
import { onMounted, ref } from 'vue';

import { fetchMessage } from '@/services/fetchers';

const message = ref('');

onMounted(async () => {
  await created();
});

const created = async () => {
  try {
    message.value = await fetchMessage();
  } catch (error) {
    message.value = 'server error :(';
  }
};
</script>

<template>
  <p>{{ message }}</p>
</template>
