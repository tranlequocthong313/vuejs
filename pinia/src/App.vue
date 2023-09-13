<script setup>
import { useTaskStore } from './stores/taskStore.js';
import TaskDetail from './components/TaskDetail.vue';
import TaskForm from './components/TaskForm.vue';
import { ref } from 'vue';
import { storeToRefs } from 'pinia';

const taskStore = useTaskStore();

const { tasks, favoriteTaskCount, favoriteTasks, totalTaskCount, loading } =
  storeToRefs(taskStore);

taskStore.getTasks();

const filter = ref('all');
</script>

<template>
  <main>
    <header>
      <img src="./assets/pinia-logo.svg" alt="pinia logo" />
      <h1>Pinia Tasks</h1>
    </header>

    <div class="new-task-form">
      <TaskForm />
    </div>

    <nav class="filter">
      <button @click="filter = 'all'">All tasks</button>
      <button @click="filter = 'favorite'">Favorite takks</button>
    </nav>

    <div class="loading" v-if="loading">Loading tasks...</div>

    <div class="task-list" v-if="filter === 'all'">
      <p>You have {{ totalTaskCount }} tasks left to do</p>
      <div v-for="task in tasks">
        <TaskDetail :task="task" />
      </div>
    </div>

    <div class="task-list" v-if="filter === 'favorite'">
      <p>You have {{ favoriteTaskCount }} tasks left to do</p>
      <div v-for="task in favoriteTasks">
        <TaskDetail :task="task" />
      </div>
    </div>

    <button @click="taskStore.$reset">reset states</button>
  </main>
</template>

<style scoped></style>
