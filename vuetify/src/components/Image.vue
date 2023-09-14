<script setup>
import { defineEmits } from 'vue';

const props = defineProps({
  src: {
    type: String,
    required: true,
  },
  lazySrc: {
    type: String,
  },
  cover: {
    type: Boolean,
  },
  aspectRatio: {
    type: Number,
  },
});

const emits = defineEmits(['on-click']);
const onClickCard = () => {
  emits('on-click');
};
</script>

<template>
  <VCard @click="onClickCard">
    <VImg v-bind="props">
      <template v-slot:placeholder>
        <VRow class="fill-height ma-0" align="center" justify="center">
          <VProgressCircular
            indeterminate
            color="grey-lighten-5"
          ></VProgressCircular>
        </VRow>
      </template>
    </VImg>
  </VCard>
</template>
