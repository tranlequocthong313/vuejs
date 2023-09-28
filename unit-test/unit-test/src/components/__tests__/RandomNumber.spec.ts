import { shallowMount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import RandomNumber from '@/components/RandomNumber.vue'

describe('RandomNumber', () => {
    it('should count 0 by default', () => {
        const wrapper = shallowMount(RandomNumber)

        expect(wrapper.vm.randomNumber).toEqual(0)
    })

    it('should render random number between 1 and 10 when click the random button', () => {
        const wrapper = shallowMount(RandomNumber)

        wrapper.find('.btn').trigger('click')

        expect(wrapper.vm.randomNumber).toBeGreaterThanOrEqual(1)
        expect(wrapper.vm.randomNumber).toBeLessThanOrEqual(10)
    })

    it('should render 100 - 200 when change min and max to 100 - 200', () => {
        const wrapper = shallowMount(RandomNumber, {
            props: {
                min: 100,
                max: 200
            }
        })

        wrapper.find('.btn').trigger('click')

        expect(wrapper.vm.randomNumber).toBeGreaterThanOrEqual(100)
        expect(wrapper.vm.randomNumber).toBeLessThanOrEqual(200)
    })
})
