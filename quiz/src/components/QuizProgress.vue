<script setup>
import { defineProps } from 'vue';
import useQuizStore from '../stores/quizStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const { progress, answeredQuestionCount, totalQuestionCount } =
  storeToRefs(store);
</script>

<template>
  <div class="mb-2">
    <div>Question {{ answeredQuestionCount }}/{{ totalQuestionCount }}</div>
    <div class="d-flex align-center">
      <VProgressLinear
        :model-value="progress"
        :height="40"
        color="red"
        class="progress-bar mt-2"
      ></VProgressLinear>
      <p class="ml-3 mt-2">{{ progress }}%</p>
    </div>
  </div>
</template>

<style scoped>
.progress-bar {
  width: 200px;
  left: 0 !important;
  transform: translateX(0%) !important;
  outline: 1px solid black;
}
</style>
