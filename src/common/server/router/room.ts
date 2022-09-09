import { createRouter } from './context'
import { z } from 'zod'

export const roomRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.room.findMany()
    }
  })
  .mutation('add', {
    input: z.object({
      name: z.string()
    }),
    async resolve({ ctx, input }) {
      const room = await ctx.prisma.room.create({
        data: input
      })

      return room
    }
  })
  .mutation('delete', {
    input: z.object({
      id: z.string().cuid()
    }),
    resolve: async ({ ctx, input }) => {
      const { id } = input
      await ctx.prisma.room.delete({ where: { id } })
    }
  })
