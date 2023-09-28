import { setupServer } from 'msw/node'
import { rest } from 'msw'
import { describe, afterAll, beforeAll, expect, it, vi, afterEach } from 'vitest'
import { flushPromises, mount } from '@vue/test-utils'

import App from './MSW.vue'
import * as fetchers from '@/services/fetchers'

const server = setupServer(
    rest.get('/message', async (req, res, ctx) => {
        return res(
            ctx.json({
                message: 'it works :)'
            })
        )
    }),
)

describe('msw', () => {
    const fetchMessageSpy = vi.spyOn(fetchers, 'fetchMessage')

    beforeAll(() => {
        server.listen()
    })

    afterEach(() => {
        fetchMessageSpy.mockClear()
        server.resetHandlers()
    })

    afterAll(() => {
        server.close()
    })

    it('calls fetchMessage once and displays a message', async () => {
        const wrapper = mount(App)

        await flushPromises()

        expect(wrapper.html()).toContain('it works :)')
        expect(fetchMessageSpy).toHaveBeenCalledOnce()
    })

    it('shows an error message on server error', async () => {
        server.use(rest.get('/message', (req, res, ctx) => {
            return res(
                ctx.status(500)
            )
        }))

        const wrapper = mount(App)

        await flushPromises()

        expect(wrapper.html()).toContain('server error :(')
        expect(fetchMessageSpy).toHaveBeenCalledOnce()
    })
})
