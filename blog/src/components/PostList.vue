<template>
  <div class="post-list">
    <ul>
      <li v-for="post in posts" :key="post.id">
        <PostItem :post="post" />
      </li>
    </ul>
  </div>
</template>

<script>
import PostItem from './PostItem.vue';
import { onMounted, onUnmounted, onUpdated } from 'vue';

export default {
  name: 'PostList',
  components: {
    PostItem,
  },
  props: {
    posts: {
      type: Array,
      required: true,
    },
  },
  setup() {
    onMounted(() => console.log('on mounted'));

    onUpdated(() => console.log('on updated'));

    onUnmounted(() => console.log('on unmounted'));
  },
};
</script>

<style>
.post-list ul {
  list-style: none;
  max-width: 520px;
  padding: 0;
  margin: 20px auto;
}

.post-list li {
  margin: 20px auto;
  padding: 12px;
  border-radius: 12px;
  background-color: #ddd;
}

.post-list li h3:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>
