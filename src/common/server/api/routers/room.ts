import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'

const roomSchema = z.object({
  name: z.string()
})

export const roomRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.room.findMany()
  }),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.string().cuid()
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input

      const room = await ctx.prisma.room.findUnique({
        where: { id }
      })

      if (!room) throw new Error(`No room with id: ${id}`)

      return room
    }),

  add: publicProcedure
    .input(
      z.object({
        data: roomSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data } = input

      const room = await ctx.prisma.room.create({
        data
      })

      return room
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        data: roomSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input

      const room = await ctx.prisma.room.update({
        where: { id },
        data
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
