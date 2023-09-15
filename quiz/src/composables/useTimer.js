import { ref } from 'vue'

const useTimer = (timer) => {
    const timeout = ref(false)
    let interval = null

    const startTimer = () => {
        clearInterval(interval)
        interval = setInterval(() => {
            timer.value -= 1000
            if (timer.value <= 0) {
                clearInterval(interval)
                timeout.value = true
            }
        }, 1000)
    }

    const stopTimer = () => {
        clearInterval(interval)
    }

    const getHour = () => {
        const hour = Math.floor(timer.value / (1000 * 60 * 60)) % 24
        return `${hour < 10 ? '0' : ''}${hour}`
    }

    const getMin = () => {
        const min = Math.floor(timer.value / (1000 * 60)) % 60
        return `${min < 10 ? '0' : ''}${min}`
    }

    const getSec = () => {
        const sec = Math.floor(timer.value / 1000) % 60
        return `${sec < 10 ? '0' : ''}${sec}`
    }

    return { startTimer, getHour, getMin, getSec, timeout, stopTimer }
}

export default useTimer
