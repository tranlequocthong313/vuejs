<script setup>
import useQuizStore from '../stores/quizStore.js';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const store = useQuizStore();
const {
  correctAnswerCount,
  totalQuestionCount,
  reviewing,
  currentQuestion,
  questions,
} = storeToRefs(store);

const router = useRouter();

const goBack = () => {
  reviewing.value = true;
  currentQuestion.value = questions.value[0];
};

const goHome = () => {
  router.push({ name: 'home' });
};
</script>

<template>
  <p>Your result...</p>
  <h1 class="my-5">{{ correctAnswerCount }}/{{ totalQuestionCount }}</h1>
  <div class="d-flex flex-wrap">
    <VBtn size="x-large" @click="goBack" class="ma-2" color="blue">
      View your answers
    </VBtn>
    <VBtn size="x-large" @click="goHome" class="ma-2"> Go home </VBtn>
  </div>
</template>
