import { ref } from 'vue'
import utils from '@/utils'

const getPosts = () => {
    const posts = ref([])
    const error = ref('')

    const load = async () => {
        const [e, data] = await utils.asyncHandler(`http://localhost:3000/posts`)

        if (e) {
            error.value = e.message
        } else {
            error.value = ''
            posts.value = data
        }
    }

    return { load, posts, error }
}

export default getPosts
