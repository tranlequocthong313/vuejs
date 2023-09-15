<script setup>
import useQuizStore from '../stores/quizStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const { questions, answered, currentQuestion } = storeToRefs(store);
</script>

<template>
  <VRow>
    <VCol cols="1" v-for="question in questions" class="mx-6">
      <VBtn
        :class="{ chosen: answered.get(question.id) }"
        @click="currentQuestion = question"
        >{{ question.id }}</VBtn
      >
    </VCol>
  </VRow>
</template>

<style scoped>
.chosen {
  background-color: green;
  color: white;
  font-size: 16px;
  font-weight: 600;
}
</style>
