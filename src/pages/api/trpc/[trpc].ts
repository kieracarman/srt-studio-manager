// src/pages/api/trpc/[trpc].ts
import { createNextApiHandler } from '@trpc/server/adapters/next'
import { appRouter } from '../../../common/server/router'
import { createContext } from '../../../common/server/router/context'

// export API handler
export default createNextApiHandler({
  router: appRouter,
  createContext
})
