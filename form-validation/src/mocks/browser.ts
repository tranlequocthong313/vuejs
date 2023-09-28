import { setupWorker, rest } from 'msw'

const worker = setupWorker(
    rest.get('/message', async (req, res, ctx) => {
        return res(
            ctx.json({
                message: 'it works :)'
            })
        )
    }),
)

export default worker
