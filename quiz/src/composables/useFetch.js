async function useFetch(url, options) {
    try {
        const res = await fetch(url, options)
        const data = await res.json()
        return [null, data]
    } catch (error) {
        return [error, null]
    }
}

export default useFetch
