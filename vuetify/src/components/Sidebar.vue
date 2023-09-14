<script setup>
import { defineEmits } from 'vue';

const emits = defineEmits(['selectOption']);

const selectOption = (isColor) => {
  emits('selectOption', isColor);
};
</script>

<template>
  <VNavigationDrawer expand-on-hover rail>
    <VList>
      <VListItem
        title="John Doe"
        subtitle="johndoe@gmail.com"
        prepend-avatar="favicon.ico"
      />
    </VList>

    <VDivider></VDivider>

    <VList density="compact" nav>
      <VListItem
        prepend-icon="mdi-image"
        title="Color Gallery"
        value="color"
        @click="selectOption(true)"
      />
      <VListItem
        prepend-icon="mdi-dialpad"
        title="Grayspace Gallery"
        value="color"
        @click="selectOption(false)"
      />
    </VList>
  </VNavigationDrawer>
</template>
