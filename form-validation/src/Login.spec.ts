import { it, describe, vi, expect, afterEach, beforeEach, beforeAll, afterAll } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'
import axios from 'axios'
import { setActivePinia, createPinia } from 'pinia'
import { setupServer } from 'msw/node'
import { rest } from 'msw'

import App from './Login.vue'

const user = {
    name: 'John Doe'
}
const server = setupServer(
    rest.post('/login', (req, res, ctx) => {
        return res(
            ctx.json(user)
        )
    })
)

const factory = () => {
    return mount(App, {
        global: {
            plugins: []
        }
    })
}

describe('Login', () => {
    beforeAll(() => {
        server.listen()
    })

    afterAll(() => {
        server.close()
    })

    beforeEach(() => {
        setActivePinia(createPinia())
    })

    afterEach(() => {
        vi.clearAllMocks()
        server.restoreHandlers()
    })

    it('successfully authenticates', async () => {
        const wrapper = factory()

        await wrapper.find('[role=username]').setValue('johndoe')
        await wrapper.find('[role=password]').setValue('password')
        await wrapper.find('form').trigger('submit.prevent')

        await flushPromises()

        expect(wrapper.html()).toContain(user.name)
        expect(wrapper.find('span').exists()).toBeFalsy()
        expect(wrapper.html()).not.toContain('Incorrect username or password')
    })

    it('failed to login', async () => {
        server.use(
            rest.post('/login', (req, res, ctx) => {
                return res(
                    ctx.status(400),
                    ctx.json({
                        message: 'Incorrect username or password'
                    })
                )
            })
        )
        const wrapper = factory()
        const post = vi.spyOn(axios, 'post')

        await wrapper.find('[role=username]').setValue('johndoe')
        await wrapper.find('[role=password]').setValue('password')
        await wrapper.find('form').trigger('submit.prevent')

        await flushPromises()

        expect(wrapper.find('span').exists()).toBeTruthy()
        expect(wrapper.html()).toContain('Incorrect username or password')
        expect(wrapper.html()).not.toContain('Hello')
        expect(post).toHaveBeenCalledOnce()
        expect(post).toBeCalledWith('/login', {
            username: 'johndoe',
            password: 'password'
        })
    })
})
