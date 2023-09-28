<script lang="ts" setup>
import { ref, toRefs } from 'vue';

const props = defineProps({
  min: {
    type: Number,
    default: 1,
  },
  max: {
    type: Number,
    default: 10,
  },
});

const randomNumber = ref(0);
const { min, max } = toRefs(props);

const getRandomNumber = () => {
  randomNumber.value =
    Math.floor(Math.random() * (max.value - min.value + 1)) + min.value;
};
</script>

<template>
  <div>
    <span>{{ randomNumber }}</span>
    <div class="btn" @click="getRandomNumber">Generate random number</div>
  </div>
</template>
