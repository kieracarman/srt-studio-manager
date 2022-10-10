// src/server/router/index.ts
import { createRouter } from './context'
import superjson from 'superjson'

import { assetRouter } from './routers/asset'
import { bookingRouter } from './routers/booking'
import { roomRouter } from './routers/room'
import { ticketRouter } from './routers/ticket'
import { userRouter } from './routers/user'
import { protectedExampleRouter } from './protected-example-router'

export const appRouter = createRouter()
  .transformer(superjson)
  .merge('asset.', assetRouter)
  .merge('booking.', bookingRouter)
  .merge('room.', roomRouter)
  .merge('ticket.', ticketRouter)
  .merge('user.', userRouter)
  .merge('auth.', protectedExampleRouter)

// export type definition of API
export type AppRouter = typeof appRouter
