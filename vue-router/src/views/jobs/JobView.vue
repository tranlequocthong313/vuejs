<template>
  <h1>Jobs page</h1>
  <ol type="1" v-if="jobs.length > 0">
    <li v-for="job in jobs" :key="job.id">
      <router-link :to="{ name: 'jobDetails', params: { id: job.id } }">
        {{ job.name }} - {{ job.description }}
      </router-link>
    </li>
  </ol>
  <div v-else>Loading...</div>
</template>

<script>
export default {
  data() {
    return {
      jobs: [],
    };
  },
  mounted() {
    fetch(`http://localhost:3000/jobs`)
      .then((res) => res.json())
      .then((data) => (this.jobs = data))
      .catch((e) => console.error(e));
  },
};
</script>

<style>
li {
  font-size: 20px;
  font-weight: bold;
  padding: 20px;
  border-radius: 12px;
  background-color: #f4f4f4;
  margin: 10px;
  max-width: 600px;
  margin: 10px auto;
}
li:hover {
  background-color: #ddd;
}
li a {
  text-decoration: none;
  color: #444;
}
</style>
