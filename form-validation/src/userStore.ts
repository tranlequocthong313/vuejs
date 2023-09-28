import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

interface LoginBody {
    username: string,
    password: string
}

const useUserStore = defineStore('userStore', () => {
    const user = ref(null)
    const error = ref(null)

    const login = async (body: LoginBody) => {
        try {
            const response = await axios.post('/login', body)
            user.value = response.data
        } catch (e: any) {
            error.value = e.response.data.message
        }
    }

    return {
        user,
        error,
        login
    }
})

export default useUserStore
