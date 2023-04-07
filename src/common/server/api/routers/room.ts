import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.room.findMany()
  }),

  add: publicProcedure
    .input(
      z.object({
        name: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.prisma.room.create({
        data: input
      })

      return room
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string().cuid()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      await ctx.prisma.room.delete({ where: { id } })
    })
})
