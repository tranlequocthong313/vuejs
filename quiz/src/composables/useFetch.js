import { getSubjects, getSubject } from '../data/db.js'

async function useFetch(url, options) {
    // try {
    //     const res = await fetch(url, options)
    //     const data = await res.json()
    //     return [null, data]
    // } catch (error) {
    //     return [error, null]
    // }

    if (url.includes('subjects/')) {
        return [null, getSubject(Number(url.substring(url.indexOf('subjects/') + 'subjects/'.length)))]
    } else {
        return [null, getSubjects()]
    }
}

export default useFetch
