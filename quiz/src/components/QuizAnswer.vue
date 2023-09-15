<script setup>
import { ref } from 'vue';
import useQuizStore from '../stores/quizStore';
import { storeToRefs } from 'pinia';

const store = useQuizStore();
const { currentQuestion, answered, reviewing } = storeToRefs(store);
const chars = 'ABCD';

const chooseAnswer = (answer) => {
  if (!reviewing.value) {
    store.answerQuiz(answer);
  }
};
</script>

<template>
  <div
    class="mt-3 d-flex container"
    v-for="(answer, index) in currentQuestion.answers"
    @click="chooseAnswer(answer, index)"
    :class="{
      chosen: answered.get(currentQuestion.id) === answer,
      wrong:
        reviewing &&
        currentQuestion.correct_answer !== answered.get(currentQuestion.id) &&
        answer === answered.get(currentQuestion.id),
      correct: reviewing && currentQuestion.correct_answer === answer,
      disabled: reviewing,
    }"
    :disabled="reviewing"
  >
    <div class="char pa-4">
      {{ chars[index] }}
    </div>
    <p class="text pa-4">
      {{ answer }}
    </p>
  </div>
</template>

<style scoped>
.container {
  user-select: none;
  border: 1px solid #000;
}

.char {
  background-color: red;
  color: white;
  font-size: 20px;
  font-weight: 800;
  cursor: pointer;
}

.text {
  width: 100%;
  height: 100%;
  font-weight: 600;
  font-size: 18px;
  cursor: pointer;
}

.char:hover,
.text:hover {
  opacity: 0.8;
}

.chosen {
  background-color: rgba(0, 0, 255, 0.5);
}
.wrong {
  background-color: rgba(255, 0, 0, 0.5);
}
.correct,
.correct {
  background-color: rgba(0, 128, 0, 0.5);
}

.disabled:hover {
  opacity: 1;
}
</style>
