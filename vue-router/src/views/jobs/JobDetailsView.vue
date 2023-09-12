<template>
  <h1>Job Detail</h1>
  <div v-if="job">
    <p>JobID: {{ job.id }}</p>
    <p>JobName: {{ job.name }}</p>
    <p>JobDescription: {{ job.description }}</p>
  </div>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      job: null,
    };
  },
  mounted() {
    fetch(`http://localhost:3000/jobs/${this.id}`)
      .then((res) => res.json())
      .then((data) => (this.job = data))
      .catch((e) => console.error(e));
  },
};
</script>

<style></style>
