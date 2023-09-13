<template>
  <div ss="home">
    <button v-if="!showPosts" @click="toggleShowPosts">Show posts</button>
    <button v-else @click="toggleShowPosts">Hide posts</button>
    <button v-if="showPosts" @click="deletePost">Delete a post</button>
    <PostList :posts="posts" v-if="posts.length && showPosts" />
    <div v-if="!posts.length && !error">Loading...</div>
    <div v-if="error">{{ error }}</div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref, watch, watchEffect } from 'vue';
import getPosts from '../composables/getPosts';
import PostList from '../components/PostList.vue';

export default {
  name: 'HomeView',
  components: {
    PostList,
  },
  setup() {
    const showPosts = ref(true);

    const { posts, error, load } = getPosts();

    onMounted(() => {
      console.log('homeview on mounted');
      load();
    });
    onUpdated(() => console.log('home view updated'));

    const toggleShowPosts = () => (showPosts.value = !showPosts.value);
    const deletePost = () => posts.value.pop();

    return { posts, showPosts, toggleShowPosts, deletePost, error };
  },
};
</script>
