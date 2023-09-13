<script setup>
import { useTaskStore } from '../stores/taskStore';

const props = defineProps({
  task: {
    type: Object,
    required: true,
  },
});
const taskStore = useTaskStore();
</script>

<template>
  <div class="task">
    <h3>{{ task.title }}</h3>
    <div class="icons">
      <i class="material-icons" @click="taskStore.deleteTask(task.id)"
        >delete</i
      >
      <i
        class="material-icons"
        :class="{ active: task.isFav }"
        @click="taskStore.toggleFavoriteTask(task.id)"
        >favorite</i
      >
    </div>
  </div>
</template>
