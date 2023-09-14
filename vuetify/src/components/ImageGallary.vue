<script setup>
import Image from './Image.vue';
const props = defineProps({
  isWithColor: {
    type: Boolean,
  },
});

const copyURL = async (url) => {
  await navigator.clipboard.writeText(url);
};
</script>

<template>
  <VCard class="mx-8 my-2 pa-3">
    <VRow>
      <VCol sm="6" md="2" lg="1" v-for="n in 200">
        <Image
          @on-click="
            copyURL(
              `https://picsum.photos/500/300?image=${n * 5 + 10}&${
                isWithColor ? '' : 'grayscale'
              }`
            )
          "
          :src="`https://picsum.photos/500/300?image=${n * 5 + 10}&${
            isWithColor ? '' : 'grayscale'
          }`"
          :lazy-src="`https://picsum.photos/10/6?image=${n * 5 + 10}&${
            isWithColor ? '' : 'grayscale'
          }`"
          :aspect-ratio="1"
          :cover="true"
        />
      </VCol>
    </VRow>
  </VCard>
</template>
