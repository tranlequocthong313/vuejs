<script setup>
import { computed } from 'vue';

import {
  isMatching,
  calculateComplexity as _calculateComplexity,
} from '@/services/password';

const props = defineProps({
  password: {
    type: String,
  },
  confirmation: {
    type: String,
  },
  minComplexity: {
    type: Number,
    default: 3,
  },
  calculateComplexity: {
    type: Function,
    default: _calculateComplexity,
  },
  isValid: {
    type: Function,
    default: () => {
      return ({ password, confirmation, complexity, isMatching }) => {
        return (
          isMatching(password, confirmation) && complexity >= this.minComplexity
        );
      };
    },
  },
});

const matching = computed(() => {
  return isMatching(props.password, props.confirmation);
});
const complexity = computed(() => {
  if (matching.value !== true) {
    return 0;
  }
  return props.calculateComplexity(props.password);
});
const valid = computed(() => {
  return props.isValid({
    password: props.password,
    confirmation: props.confirmation,
    complexity: complexity.value,
    isMatching,
  });
});
</script>

<template>
  <slot :matching="matching" :complexity="complexity" :valid="valid" />
</template>
