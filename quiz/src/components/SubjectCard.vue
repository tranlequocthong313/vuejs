<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  subject: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <VCard class="subject-card">
    <router-link :to="{ name: 'quiz', params: { id: subject.id } }">
      <VImg
        :src="subject.thumb"
        :lazy-src="subject.thumb"
        max-height="200"
        min-height="200"
        cover
      >
      </VImg>
      <div class="pa-3">
        <h3>{{ subject.name }}</h3>
        <p>{{ subject.questions.length }} questions</p>
      </div>
    </router-link>
  </VCard>
</template>

<style scoped>
.subject-card {
  width: 100%;
}
a {
  text-decoration: none;
  color: var(--color-text);
}
</style>
