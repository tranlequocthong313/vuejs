export const isMatching = (password, confirmation) => {
    if (!password || !confirmation) {
        return false
    }
    return password === confirmation
}

export const calculateComplexity = (password) => {
    if (!password) {
        return 0
    }

    if (password.length >= 10) {
        return 3
    }
    if (password.length >= 7) {
        return 2
    }
    if (password.length >= 5) {
        return 1
    }

    return 0
}

export const calculateComplexity2 = (password) => {
    let complexity = 0

    if (password.length >= 8) {
        const hasUpperCase = /[A-Z]/.test(password)
        const hasLowerCase = /[a-z]/.test(password)

        if (hasUpperCase && hasLowerCase) {
            const hasNumber = /[0-9]/.test(password)

            if (hasNumber) {
                const hasSpecialChar = /[!@#$%^&*]/.test(password)

                if (hasSpecialChar) {
                    complexity = 3
                } else {
                    complexity = 2
                }
            } else {
                complexity = 1
            }
        }
    }

    return complexity
}
