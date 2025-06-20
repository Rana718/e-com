import { fetchRequestHandler } from '@trpc/server/adapters/fetch'
import { appRouter } from '@/server'
import { createContext } from '@/server/context'

const handler = async (req: Request) => {
  console.log('tRPC Handler called:', req.method, req.url)
  
  try {
    return await fetchRequestHandler({
      endpoint: '/api/trpc',
      req,
      router: appRouter,
      createContext: () => createContext({ req: req as any }),
      onError: ({ error, path }) => {
        console.error('tRPC Error:', error, 'Path:', path)
      },
    })
  } catch (error) {
    console.error('tRPC Handler Error:', error)
    return new Response('Internal Server Error', { status: 500 })
  }
}

export { handler as GET, handler as POST }
