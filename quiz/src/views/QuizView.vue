<script setup>
import QuizProgress from '../components/QuizProgress.vue';
import QuizAnswer from '../components/QuizAnswer.vue';
import QuizResult from '../components/QuizResult.vue';
import QuizMap from '../components/QuizMap.vue';
import useQuizStore from '../stores/quizStore.js';
import { storeToRefs } from 'pinia';
import { onUnmounted, onMounted, computed, watch, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import useTimer from '../composables/useTimer.js';

const store = useQuizStore();
const {
  questions,
  reviewing,
  loading,
  timer,
  submitted,
  progress,
  currentQuestion,
  answered,
} = storeToRefs(store);

const route = useRoute();
const router = useRouter();

const { getHour, getMin, getSec, startTimer, timeout, stopTimer } =
  useTimer(timer);

const alertSound = new Audio();
alertSound.src = '/alarm-kitchen.mp3';

onMounted(async () => {
  await store.getQuiz(route.params.id);
  startTimer();
});

onUnmounted(() => {
  stopTimer();
  store.resetStates();
});

const submit = () => {
  if (timeout.value || progress.value !== 100 || reviewing.value) {
    return;
  }
  submitted.value = true;
  stopTimer();
};

const currentTimer = computed(() => {
  return timeout.value ? 'TIMEOUT!!!' : `${getHour()}:${getMin()}:${getSec()}`;
});

watch(timeout, () => {
  alertSound.play();
});

const clearAnswers = () => {
  for (let [k, _] of answered.value.entries()) {
    answered.value.set(k, null);
  }
};

const onClearAnswers = (isActiveModal, accept) => {
  isActiveModal.value = false;
  if (accept) {
    clearAnswers();
  }
};
</script>

<template>
  <div
    class="container d-flex h-100 fill-height w-100 justify-center align-center"
  >
    <div v-if="loading">Loading...</div>
    <div v-else-if="submitted && !reviewing">
      <QuizResult />
    </div>
    <VRow v-else class="w-100 d-flex align-center">
      <VCol cols="8">
        <div class="d-flex justify-space-between align-center">
          <QuizProgress />
          <h2>Timer: {{ currentTimer }}</h2>
        </div>
        <h1 class="question" :class="{ 'allow-user-select': reviewing }">
          {{ currentQuestion.question }}
        </h1>
        <QuizAnswer />
        <div class="buttons">
          <VBtn
            :disabled="currentQuestion.id === 1"
            variant="elevated"
            class="back-button ma-2"
            size="x-large"
            @click="store.prevQuestion"
            >Back</VBtn
          >
          <VBtn
            v-if="currentQuestion.id !== questions.length"
            variant="elevated"
            class="next-button ma-2"
            size="x-large"
            @click="store.nextQuestion"
            >Next</VBtn
          >
          <VBtn
            v-if="
              currentQuestion.id === questions.length && !reviewing && !timeout
            "
            :disabled="progress !== 100"
            variant="elevated"
            class="submit-button ma-2"
            size="x-large"
            @click="submit"
            >Submit</VBtn
          >
          <VBtn
            v-if="currentQuestion.id === questions.length && reviewing"
            variant="elevated"
            class="go-home-button ma-2"
            size="x-large"
            @click="router.push({ name: 'home' })"
            >Go home</VBtn
          >
        </div>
      </VCol>
      <VCol cols="4">
        <h3 class="mb-3">Answers:</h3>
        <QuizMap v-if="!submitted || reviewing" />
        <VDialog width="500">
          <template v-slot:activator="{ props }">
            <VBtn v-bind="props" class="mt-10 clear-answers-button"
              >Clear all</VBtn
            >
          </template>
          <template v-slot:default="{ isActive }">
            <VCard title="Dialog">
              <VCardText> Are you sure? </VCardText>

              <VCardActions>
                <VSpacer></VSpacer>

                <VBtn text="No" @click="onClearAnswers(isActive, false)"></VBtn>
                <VBtn text="Yes" @click="onClearAnswers(isActive, true)"></VBtn>
              </VCardActions>
            </VCard>
          </template>
        </VDialog>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.container {
  text-align: center;
}

.question {
  margin: 30px 0;
  user-select: none;
}

.allow-user-select {
  user-select: text;
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin-top: 30px;
  user-select: none;
}

.next-button {
  width: 150px;
  background-color: red;
  color: white;
  font-size: 16px;
  font-weight: 700;
  outline: 1px solid black;
}

.back-button {
  width: 150px;
  background-color: #ddd;
  color: #000;
  font-size: 16px;
  font-weight: 700;
  outline: 1px solid black;
}

.submit-button {
  width: 150px;
  background-color: green;
  color: white;
  font-size: 16px;
  font-weight: 700;
  outline: 1px solid black;
}

.go-home-button {
  width: 150px;
  background-color: blue;
  color: white;
  font-size: 16px;
  font-weight: 700;
  outline: 1px solid black;
}

.clear-answers-button {
  width: 150px;
  background-color: grey;
  color: white;
  font-size: 16px;
  font-weight: 700;
  outline: 1px solid black;
}

.next-button:hover {
  filter: brightness(80%);
}
</style>
