import { createTRPCRouter } from '@server/api/trpc'
import {
  assetRouter,
  bookingRouter,
  roomRouter,
  ticketRouter,
  userRouter
} from '@server/api/routers'

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  asset: assetRouter,
  booking: bookingRouter,
  room: roomRouter,
  ticket: ticketRouter,
  user: userRouter
})

// export type definition of API
export type AppRouter = typeof appRouter
