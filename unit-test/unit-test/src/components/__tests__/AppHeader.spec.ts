import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import AppHeader from '@/components/AppHeader.vue'

describe('AppHeader', () => {
  it('should not render the logout button, if a user is not logged in', () => {
    const wrapper = mount(AppHeader) // deep copy

    expect(wrapper.find('button').isVisible()).toBe(false)
  })

  it('should render the logout button, if a user is logged in', () => {
    const wrapper = mount(AppHeader) // deep copy

    wrapper.setProps({
      loggedIn: true
    })

    expect(wrapper.find('button').isVisible()).toBe(false)
  })
})
