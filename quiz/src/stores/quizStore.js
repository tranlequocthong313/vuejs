import { defineStore } from 'pinia'
import useFetch from '../composables/useFetch.js'
import { computed, ref } from 'vue'

const useQuizStore = defineStore('quizStore', () => {
    const questions = ref(null)
    const error = ref('')
    const answered = ref(new Map)
    const currentQuestion = ref(null)
    const loading = ref(true)
    const submitted = ref(false)
    const reviewing = ref(false)
    const timer = ref(0)

    function resetStates() {
        questions.value = null
        error.value = ''
        answered.value = new Map
        currentQuestion.value = null
        loading.value = true
        submitted.value = false
        reviewing.value = false
        timer.value = 0
    }

    function answerQuiz(answer) {
        answered.value.set(currentQuestion.value.id, answer)
    }

    const correctAnswerCount = computed(() => {
        let correctCount = 0
        for (let [k, v] of answered.value.entries()) {
            if (questions.value[k - 1].correct_answer === v) {
                correctCount++
            }
        }
        return correctCount
    })

    const totalQuestionCount = computed(() => {
        return questions.value?.length ?? 0
    })

    const answeredQuestionCount = computed(() => {
        let count = 0
        answered.value.forEach((it) => {
            if (it) {
                count++
            }
        })
        return count
    })

    const progress = computed(() => {
        let count = 0
        answered.value.forEach((it) => {
            if (it) {
                count++
            }
        })
        return Math.floor(count / questions.value?.length * 100)
    })

    function prevQuestion() {
        const index = currentQuestion.value.id - 1 - 1
        if (index >= 0) {
            currentQuestion.value = questions.value[index]
        }
    }

    function nextQuestion() {
        const index = currentQuestion.value.id - 1 + 1
        if (index < questions.value.length) {
            currentQuestion.value = questions.value[index]
        }
    }

    async function getQuiz(id) {
        loading.value = true
        const [err, data] = await useFetch(`http://localhost:3000/subjects/${id}`)
        if (err) {
            error.value = err
        } else {
            questions.value = data.questions
            currentQuestion.value = questions.value[0]
            questions.value.forEach(q => {
                answered.value.set(q.id, null)
            })
            timer.value = data.time
        }
        loading.value = false
    }

    return {
        currentQuestion,
        questions,
        error,
        getQuiz,
        answered,
        answerQuiz,
        totalQuestionCount,
        answeredQuestionCount,
        loading,
        progress,
        nextQuestion,
        prevQuestion,
        correctAnswerCount,
        submitted,
        reviewing,
        timer,
        resetStates,
    }
})

export default useQuizStore
