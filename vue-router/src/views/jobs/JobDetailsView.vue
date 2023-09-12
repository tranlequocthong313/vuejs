<template>
  <h1>Job Detail</h1>
  <p>JobID: {{ id }}</p>
  <p>JobName:</p>
  <p>JobDescription:</p>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
};
</script>

<style></style>
