import { router } from './trpc'
import { categoriesRouter } from './routers/categories'
import { authRouter } from './routers/auth'

export const appRouter = router({
  categories: categoriesRouter,
  auth: authRouter,
})

export type AppRouter = typeof appRouter
