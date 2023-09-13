import utils from '@/utils'
import { ref } from 'vue'

const getPost = () => {
    const post = ref(null)
    const error = ref('')

    const load = async (id) => {
        const [e, data] = await utils.asyncHandler(`http://localhost:3000/posts/${id}`)

        if (e) {
            error.value = e.message
        } else {
            error.value = ''
            post.value = data
        }
    }

    return { post, error, load }
}

export default getPost
