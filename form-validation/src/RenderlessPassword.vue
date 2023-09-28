<script setup lang="ts">
import { ref } from 'vue';

const complexity = ref(5);
</script>

<template>
  <slot :complexity="complexity"></slot>
</template>
