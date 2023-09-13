<script setup>
import { ref } from 'vue';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore();

const handleSubmit = () => {
  if (taskTitle.value.trim().length > 0) {
    taskStore.addTask({
      id: Math.floor(Math.random() * 10000),
      title: taskTitle.value,
      isFav: false,
    });
  }
  taskTitle.value = '';
};

const taskTitle = ref('');
</script>

<template>
  <form @submit.prevent="handleSubmit">
    <input type="text" placeholder="I need to..." v-model="taskTitle" />
    <button>Add</button>
  </form>
</template>
