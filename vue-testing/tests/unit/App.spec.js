import { mount } from '@vue/test-utils'
import App from './App.vue'
import { createStore } from 'vuex'

const createVuexStore = () => {
    return createStore({
        state() {
            return {
                count: 0
            }
        },
        mutations: {
            increment(state) {
                state.count++
            }
        }
    })
}

global.fetch = jest.fn(() => {
    return Promise.resolve({
        json: () => Promise.resolve()
    })
})

function factory({ data } = { data: {} }) {
    const store = createVuexStore()
    return mount(App, {
        data() {
            return data
        },
        global: {
            plugins: [store],
            mocks: {
                $route: {
                    params: {
                        postId: '1'
                    }
                }
            },
            stubs: {
                Fetcher: {
                    mounted() {
                        fetch('/')
                    }
                }
            }
        }
    })
}

describe('App', () => {
    beforeEach(() => {
        fetch.mockClear()
    })
    it('should render count when odd', async () => {
        const wrapper = factory()
        for (let i = 0; i < 5; i++) {
            await wrapper.find('button').trigger('click')
        }
        expect(wrapper.html()).toContain('5')
        expect(wrapper.html()).toContain('Odd')
    })
    it('should render count when even', async () => {
        const wrapper = factory()
        await wrapper.find('button').trigger('click')
        await wrapper.find('button').trigger('click')
        expect(wrapper.html()).toContain('2')
        expect(wrapper.html()).toContain('Even')
    })
    it('should increase count by 1 when click increase button', async () => {
        const wrapper = factory()
        await wrapper.find('button').trigger('click')
        expect(wrapper.html()).toContain('1')
        expect(wrapper.html()).toContain('Odd')
    })
    it('should have correct postId', async () => {
        const wrapper = factory()
        expect(wrapper.html()).toContain('PostID: 1')
    })
    it('should have been called 1', async () => {
        const wrapper = factory()
        expect(fetch).toHaveBeenCalledTimes(1)
    })
    it('should emit a count event with correct payload', async () => {
        const wrapper = factory()

        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted().count[0][0]).toBe(1)

        await wrapper.find('button').trigger('click')
        expect(wrapper.emitted().count[1][0]).toBe(2)
    })
    it('should render a profile link', () => {
        const wrapper = factory()
        expect(wrapper.get('#profile').text()).toBe('My Profile')
    })
    it('should render an admin link', () => {
        const wrapper = factory({ data: { admin: true } })
        expect(wrapper.get('#admin').text()).toBe('Admin')
    })
    it('should not render an admin link', () => {
        const wrapper = factory({ data: { admin: false } })
        expect(wrapper.find('#admin').exists()).toBeFalsy()
    })
})
