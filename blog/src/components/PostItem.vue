<template>
  <div class="post">
    <router-link :to="{ name: 'postDetail', params: { id: post.id } }">
      <h3>{{ post.title }}</h3>
    </router-link>
    <p>{{ snippet }}</p>
    <span class="pill" v-for="tag in post.tags">#{{ tag }}</span>
  </div>
</template>

<script>
import { computed } from 'vue';

export default {
  name: 'PostItem',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  setup({ post }) {
    const snippet = computed(() =>
      post.body.substring(0, post.body.length * 0.5)
    );
    return { snippet };
  },
};
</script>

<style>
.pill {
  padding: 8px 10px;
  border-radius: 12px;
  margin: 8px 8px 0 0;
  background-color: #ccc;
}

.pill:hover {
  opacity: 0.8;
  cursor: pointer;
}

.post a {
  text-decoration: none;
  color: #2c3e50;
}
</style>
