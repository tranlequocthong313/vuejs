interface ValidationResult {
    valid: boolean,
    message?: string
}

interface RangeInput {
    min: number,
    max: number
}

export interface Patient {
    name: string,
    weight: {
        value: number,
        units: 'kg' | 'lb'
    }
}

export interface PatientFormValidity {
    name: ValidationResult,
    weight: ValidationResult
}

const limits = {
    kg: { min: 30, max: 200 } as RangeInput,
    lb: { min: 66, max: 440 } as RangeInput,
}

export const required = (value: any): ValidationResult => {
    if (!value) {
        return {
            valid: false,
            message: 'Required'
        }
    }
    return { valid: true }
}

export const isBetween = (value: number, { min, max }: RangeInput): ValidationResult => {
    if (value < min || value > max) {
        return {
            valid: false,
            message: `Must be between ${min} and ${max}`
        }
    }
    return { valid: true }
}

export const validateMeasurement = (value: any, range: RangeInput): ValidationResult => {
    const validation = required(value)
    if (!validation.valid) {
        return validation
    }

    if (typeof value !== 'number') {
        return {
            valid: false,
            message: 'Weight must be a number'
        }
    }

    return isBetween(value!!, range)
}

export const isFormValid = (form: PatientFormValidity): boolean => {
    for (let { valid } of Object.values(form)) {
        if (!valid) {
            return false
        }
    }
    return true
}

export const patientForm = (patient: Patient): PatientFormValidity => {
    return {
        name: required(patient.name),
        weight: validateMeasurement(patient.weight.value, limits[patient.weight.units])
    }
}
