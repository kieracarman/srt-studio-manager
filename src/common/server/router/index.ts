// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { assetRouter } from './asset'
import { roomRouter } from './room'
import { protectedExampleRouter } from './protected-example-router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('asset.', assetRouter)
  .merge('room.', roomRouter)
  .merge('auth.', protectedExampleRouter)

// export type definition of API
export type AppRouter = typeof appRouter
