<script lang="ts" setup>
defineProps({
  loggedIn: {
    type: Boolean,
    default: () => false,
  },
});
</script>

<template>
  <div>
    <button class="btn" v-show="loggedIn">Logout</button>
  </div>
</template>
