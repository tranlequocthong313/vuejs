<script setup>
import { ref } from 'vue';
import ImageGallary from './components/ImageGallary.vue';
import Sidebar from './components/Sidebar.vue';

const isWithColor = ref(true);
</script>

<template>
  <VApp>
    <!-- SIDEBAR -->
    <Sidebar @select-option="(isColor) => (isWithColor = isColor)" />
    <VMain>
      <!-- CARDS -->
      <ImageGallary :isWithColor="isWithColor" />
    </VMain>
  </VApp>
</template>
