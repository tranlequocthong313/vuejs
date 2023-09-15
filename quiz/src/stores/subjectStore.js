import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import useFetch from '../composables/useFetch.js'

const useSubjectStore = defineStore('subjectStore', () => {
  const subjects = ref(null)
  const error = ref('')
  const searchText = ref('')

  const searchedSubjects = computed(() => {
    return subjects.value?.filter(subject => subject.name.toLowerCase().includes(searchText.value.toLowerCase()))
  })

  async function getSubjects() {
    const [err, data] = await useFetch(`http://localhost:3000/subjects`)
    if (err) {
      error.value = err
    }
    subjects.value = data
  }

  return { subjects, error, getSubjects, searchText, searchedSubjects }
})

export default useSubjectStore
