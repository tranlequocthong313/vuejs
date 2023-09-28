<script setup>
import { ref } from 'vue';

import RenderlessPassword from './components/RenderlessPassword.vue';
import { calculateComplexity2 } from './services/password';

const password = ref('');
const confirmation = ref('');

const submit = () => {
  console.log('submit', {
    password: password.value,
    confirmation: confirmation.value,
  });
};

const complexityStyles = {
  1: 'low',
  2: 'mid',
  3: 'high',
};

const complexityStyle = (complexity) => {
  return complexityStyles[complexity];
};

const isValid = ({ password, confirmation, isMatching }) => {
  const complexity = calculateComplexity2(password);
  console.log(complexity);
  return isMatching(password, confirmation) && complexity >= 3;
};
</script>

<template>
  <RenderlessPassword
    v-slot="{ matching, complexity, valid }"
    :password="password"
    :confirmation="confirmation"
    :min-complexity="3"
    :isValid="isValid"
  >
    <form @submit.prevent="submit" class="wrapper">
      <div class="field">
        <label for="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          v-model="password"
        />
      </div>
      <div class="field">
        <label for="confirmation">Confirmation</label>
        <input
          id="confirmation"
          name="confirmation"
          type="password"
          v-model="confirmation"
        />
      </div>
      <div class="field">
        <button :disabled="!valid" type="submit">Submit</button>
      </div>
      <div class="complexity-field">
        <div class="complexity" :class="complexityStyle(complexity)" />
      </div>
    </form>

    <p>Matches: {{ matching }}</p>
    <p>Complexity: {{ complexity }}</p>
  </RenderlessPassword>
</template>

<style scoped>
.wrapper {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.field {
  width: 100%;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  margin: 5px 0;
}

input {
  height: 30px;
  font-size: 1.5rem;
}

.complexity-field {
  width: 100%;
}

.complexity {
  transition: 0.2s;
  height: 10px;
}

.high {
  width: 100%;
  background: lime;
}

.mid {
  width: 66%;
  background: yellow;
}

.low {
  width: 33%;
  background: red;
}

button {
  height: 30px;
  background: none;
  border: none;
  font-size: 1.5rem;
  background: steelblue;
  color: white;
  padding: 4px 0;
  width: 100%;
  box-sizing: content-box;
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}
</style>
