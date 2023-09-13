<template>
  <h1>Count: {{ count }}. Count is {{ count % 2 === 0 ? 'Even' : 'Odd' }}</h1>
  <button @click="increaseCount">Increase count</button>
  <div>PostID: {{ postId }}</div>
  <Fetcher />
  <nav>
    <a href="/profile" id="profile">My Profile</a>
    <a href="/admin" id="admin" v-if="admin">Admin</a>
  </nav>
</template>

<script>
import Fetcher from './Fetcher.vue';

export default {
  data() {
    return {
      admin: false,
    };
  },
  components: {
    Fetcher,
  },
  computed: {
    postId() {
      return this.$route.params.postId;
    },
    count() {
      return this.$store.state.count;
    },
  },
  methods: {
    increaseCount() {
      this.$store.commit('increment');
      this.$emit('count', this.$store.state.count);
    },
  },
};
</script>
