import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import {
    required,
    isBetween,
    validateMeasurement,
    isFormValid,
    patientForm,
    type Patient
} from './form'
import Form from './Form.vue'

describe('required', () => {
    it('should be invalid when undefined', () => {
        expect(required(undefined)).toEqual({
            valid: false,
            message: 'Required'
        })
    })

    it('should be invalid when empty string', () => {
        expect(required('')).toEqual({
            valid: false,
            message: 'Required'
        })
    })

    it('should be valid when value is present', () => {
        expect(required('value')).toEqual({
            valid: true,
        })
    })
})

describe('isBetween', () => {
    it('should be valid when value is equal to min', () => {
        expect(isBetween(5, { min: 5, max: 10 })).toEqual({
            valid: true
        })
    })

    it('should be valid when value is equal to max', () => {
        expect(isBetween(10, { min: 5, max: 10 })).toEqual({
            valid: true
        })
    })

    it('should be valid when value is between min/max', () => {
        expect(isBetween(7, { min: 5, max: 10 })).toEqual({
            valid: true
        })
    })

    it('should be invalid when value is less than min', () => {
        expect(isBetween(4, { min: 5, max: 10 })).toEqual({
            valid: false,
            message: 'Must be between 5 and 10'
        })

    })

    it('should be invalid when value is greater than max', () => {
        expect(isBetween(11, { min: 5, max: 10 })).toEqual({
            valid: false,
            message: 'Must be between 5 and 10'
        })
    })
})

describe('validateMeasurement', () => {
    it('should be valid when value is in constraints', () => {
        const actual = validateMeasurement(7, { min: 5, max: 10 })

        expect(actual).toEqual({ valid: true })
    })

    it('should be invalid when value is null/undefined', () => {
        const actual = validateMeasurement(Number(undefined), { min: 5, max: 10 })

        expect(actual).toEqual({
            valid: false,
            message: 'Required'
        })
    })

    it('should be invalid when value is outside the constraints', () => {
        const actual = validateMeasurement(12, { min: 5, max: 10 })

        expect(actual).toEqual({
            valid: false,
            message: 'Must be between 5 and 10'
        })
    })

    it('should be invalid when value is non-numeric', () => {
        const actual = validateMeasurement('non-numeric', { min: 5, max: 10 })

        expect(actual).toEqual({
            valid: false,
            message: 'Weight must be a number'
        })
    })
})

describe('isFormValid', () => {
    it('should be valid when name and weight field are valid', () => {
        const form = {
            name: { valid: true },
            weight: { valid: true },
        }

        expect(isFormValid(form)).toBeTruthy()
    })

    it('should be invalid when any field is invalid', () => {
        const form = {
            name: { valid: true },
            weight: { valid: false },
        }

        expect(isFormValid(form)).toBeFalsy()
    })
})

describe('patientForm', () => {
    const validPatient: Patient = {
        name: 'John Doe',
        weight: { value: 100, units: 'kg' }
    }

    it('should be valid if form is filled out correctly', () => {
        const form = patientForm(validPatient)

        expect(form.name).toEqual({ valid: true })
        expect(form.weight).toEqual({ valid: true })
    })

    it('should be invalid when name is null/empty', () => {
        const form = patientForm({ ...validPatient, name: '' })

        expect(form.name).toEqual({ valid: false, message: 'Required' })
        expect(form.weight).toEqual({ valid: true })
    })

    it('validates weight in imperial', () => {
        const form = patientForm({
            ...validPatient, weight: {
                value: 65,
                units: 'lb'
            }
        })

        expect(form.name).toEqual({ valid: true })
        expect(form.weight).toEqual({ valid: false, message: 'Must be between 66 and 440' })
    })

    it('validates weight in metric', () => {
        const form = patientForm({
            ...validPatient, weight: {
                value: 29,
                units: 'kg'
            }
        })

        expect(form.name).toEqual({ valid: true })
        expect(form.weight).toEqual({ valid: false, message: 'Must be between 30 and 200' })
    })
})

describe('App', () => {
    const factory = () => {
        return mount(App)
    }

    it('fills out form correctly', async () => {
        const wrapper = factory()

        await wrapper.find('#name').setValue('John')
        await wrapper.find('[name=weight-units]').setValue('lb')
        await wrapper.find('#weight').setValue('150')

        expect(wrapper.html()).toContain('John')
        expect(wrapper.html()).toContain('lb')
        expect(wrapper.html()).toContain('150')

        expect(wrapper.find('.error').exists()).toBeFalsy()
    })

    it('shows error for invalid inputs', async () => {
        const wrapper = factory()

        await wrapper.find('#name').setValue('')
        await wrapper.find('#weight').setValue('5')
        await wrapper.find('[name=weight-units]').setValue('lb')

        expect(wrapper.findAll('.error')).toHaveLength(2)
    })

    it('should disable submit button by default or in invalid form', async () => {
        const wrapper = factory()

        expect(wrapper.find('button[type=submit]').attributes().disabled).toBeDefined()

        await wrapper.find('#name').setValue('')
        await wrapper.find('[name=weight-units]').setValue('lb')
        await wrapper.find('#weight').setValue('5')

        expect(wrapper.find('button[type=submit]').attributes().disabled).toBeDefined()
    })


    it('should enable submit button when form is valid', async () => {
        const wrapper = factory()

        expect(wrapper.find('button[type=submit]').attributes().disabled).toBeDefined()

        await wrapper.find('#name').setValue('John')
        await wrapper.find('[name=weight-units]').setValue('lb')
        await wrapper.find('#weight').setValue('150')

        expect(wrapper.find('button[type=submit]').attributes().disabled).toBeUndefined()
    })

    it('should emit submit event and pass correct validation states', async () => {
        const wrapper = factory()

        await wrapper.find('#name').setValue('John')
        await wrapper.find('[name=weight-units]').setValue('lb')
        await wrapper.find('#weight').setValue('150')
        await wrapper.find('button[type=submit]').trigger('submit.prevent')

        expect(wrapper.emitted()).toHaveProperty('submit')
        expect(wrapper.emitted().submit[0]).toHaveLength(1)
        expect(wrapper.emitted().submit[0][0]).toMatchObject({
            name: { valid: true },
            weight: { valid: true },
        })
    })
})
