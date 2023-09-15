<script setup>
import { onMounted } from 'vue';
import SubjectCard from '../components/SubjectCard.vue';
import { storeToRefs } from 'pinia';
import useSubjectStore from '../stores/subjectStore.js';

const store = useSubjectStore();
const { error, searchText, searchedSubjects } = storeToRefs(store);

onMounted(() => {
  store.getSubjects();
});
</script>

<template>
  <div class="header">
    <h1 class="mt-1">Quizes</h1>
    <VTextField
      label="Search..."
      class="search-input ml-10"
      v-model="searchText"
    ></VTextField>
  </div>
  <VContainer>
    <div v-if="error">{{ error }}</div>
    <VRow v-else>
      <VCol
        v-for="subject in searchedSubjects"
        :key="subject.id"
        lg="4"
        md="6"
        sm="12"
      >
        <SubjectCard :subject="subject" />
      </VCol>
    </VRow>
  </VContainer>
</template>

<style>
.header {
  display: flex;
  margin: 40px;
}

.header .search-input {
  width: 200px;
}
</style>
