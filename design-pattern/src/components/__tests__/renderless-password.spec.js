import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'

// business logic
import { isMatching, calculateComplexity, calculateComplexity2 } from '@/services/password'

describe('password', () => {
    it('returns false if password or confirmation is empty', () => {
        expect(isMatching('', 'confirmation')).toBeFalsy()
        expect(isMatching('password', '')).toBeFalsy()
    })

    it('returns true if password and confirmation is exist and equal', () => {
        expect(isMatching('password', 'password')).toBeTruthy()
    })

    it('should return correct complexity', () => {
        expect(calculateComplexity('')).toEqual(0)
        expect(calculateComplexity('123')).toEqual(0)
        expect(calculateComplexity('12345')).toEqual(1)
        expect(calculateComplexity('1234567')).toEqual(2)
        expect(calculateComplexity('123457890')).toEqual(2)
        expect(calculateComplexity('1234578910')).toEqual(3)
    })
})

// describe('App', () => {
//     const factory = () => {
//         return mount(App)
//     }

//     it('should not use any complexity class when password is not complex', async () => {
//         const wrapper = factory()

//         for (let i = 0; i < 4; i++) {
//             await wrapper.find('#password').setValue('a'.repeat(i))
//             await wrapper.find('#confirmation').setValue('a'.repeat(i))

//             expect(wrapper.find('.high').exists()).toBeFalsy()
//             expect(wrapper.find('.mid').exists()).toBeFalsy()
//             expect(wrapper.find('.low').exists()).toBeFalsy()
//         }
//     })

//     it('should use low complexity class', async () => {
//         const wrapper = factory()

//         for (let i = 5; i < 7; i++) {
//             await wrapper.find('#password').setValue('a'.repeat(i))
//             await wrapper.find('#confirmation').setValue('a'.repeat(i))

//             expect(wrapper.find('.high').exists()).toBeFalsy()
//             expect(wrapper.find('.mid').exists()).toBeFalsy()
//             expect(wrapper.find('.low').exists()).toBeTruthy()
//             expect(wrapper.find('.complexity').classes()).toContain('low')
//         }
//     })

//     it('should use mid complexity class', async () => {
//         const wrapper = factory()

//         for (let i = 7; i < 10; i++) {
//             await wrapper.find('#password').setValue('a'.repeat(i))
//             await wrapper.find('#confirmation').setValue('a'.repeat(i))

//             expect(wrapper.find('.high').exists()).toBeFalsy()
//             expect(wrapper.find('.mid').exists()).toBeTruthy()
//             expect(wrapper.find('.low').exists()).toBeFalsy()
//             expect(wrapper.find('.complexity').classes()).toContain('mid')
//         }
//     })

//     it('should use high complexity class', async () => {
//         const wrapper = factory()

//         for (let i = 10; i < 20; i++) {
//             await wrapper.find('#password').setValue('a'.repeat(i))
//             await wrapper.find('#confirmation').setValue('a'.repeat(i))

//             expect(wrapper.find('.high').exists()).toBeTruthy()
//             expect(wrapper.find('.mid').exists()).toBeFalsy()
//             expect(wrapper.find('.low').exists()).toBeFalsy()
//             expect(wrapper.find('.complexity').classes()).toContain('high')
//         }
//     })

//     it('should disable submit button by default', async () => {
//         const wrapper = factory()

//         expect(wrapper.find('button[type=submit]').exists())
//         expect(wrapper.find('button[type=submit]').attributes().disabled).toBeDefined()
//     })

//     it('should disable submit button when password is not complex enough', async () => {
//         const wrapper = factory()

//         for (let i = 0; i < 10; i++) {
//             await wrapper.find('#password').setValue('a'.repeat(i))
//             await wrapper.find('#confirmation').setValue('a'.repeat(i))

//             expect(wrapper.find('button[type=submit]').exists())
//             expect(wrapper.find('button[type=submit]').attributes().disabled).toBeDefined()
//         }
//     })

//     it('should enable submit button when form is valid', async () => {
//         const wrapper = factory()

//         for (let i = 10; i < 20; i++) {
//             await wrapper.find('#password').setValue('a'.repeat(i))
//             await wrapper.find('#confirmation').setValue('a'.repeat(i))


//             expect(wrapper.find('button[type=submit]').exists())
//             expect(wrapper.find('button[type=submit]').attributes().disabled).toBeUndefined()
//         }
//     })
// })
