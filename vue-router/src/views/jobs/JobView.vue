<template>
  <h1>Jobs page</h1>
  <ol type="1">
    <li v-for="job in jobs" :key="job.id">
      <router-link :to="{ name: 'jobDetails', params: { id: job.id } }">
        {{ job.name }} - {{ job.description }}
      </router-link>
    </li>
  </ol>
</template>

<script>
export default {
  data() {
    return {
      jobs: [
        { id: 1, name: 'IT', description: 'lorem' },
        { id: 2, name: 'QA', description: 'lorem' },
        { id: 3, name: 'HR', description: 'lorem' },
      ],
    };
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
