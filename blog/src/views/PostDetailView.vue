<template>
  <div class="wrapper" v-if="post">
    <h1>{{ post.title }}</h1>
    <p>{{ post.body }}</p>
    <span class="pill" v-for="tag in post.tags">#{{ tag }}</span>
  </div>
  <div v-if="!error && !post">Loading...</div>
  <div v-if="error">{{ error }}</div>
</template>

<script>
import { onMounted } from 'vue';
import getPost from '../composables/getPost.js';

export default {
  name: 'PostDetailView',
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  setup({ id }) {
    const { post, error, load } = getPost();

    onMounted(() => load(id));

    return { post, error };
  },
};
</script>
