const asyncHandler = async (url) => {
    try {
        const res = await fetch(url)
        if (res.ok) {
            const data = await res.json()
            return [null, data]
        }
        throw new Error('Data unavailable!')
    } catch (e) {
        return [e, null]
    }
}

export default {
    asyncHandler
}
