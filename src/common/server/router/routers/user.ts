import { createProtectedRouter } from '../context'
import { z } from 'zod'

const userSchema = z.object({
  email: z.string().email().nullable().optional(),
  role: z.string(),
  accessLevel: z.string()
})

export const userRouter = createProtectedRouter()
  .query('getCurrentRole', {
    async resolve({ ctx }) {
      const userResponse = await ctx.prisma.user.findFirst({
        where: { id: ctx.session.user.id },
        select: { role: true }
      })

      return userResponse?.role
    }
  })
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.user.findMany()
    }
  })
  .query('getOne', {
    input: z.object({
      id: z.string().cuid()
    }),
    async resolve({ ctx, input }) {
      const { id } = input

      const user = await ctx.prisma.user.findUnique({
        where: { id },
        include: {
          accounts: true,
          sessions: true,
          bookings: true,
          tickets: true
        }
      })

      if (!user) {
        throw new Error(`No user with id: ${id}`)
      }

      return user
    }
  })
  .mutation('add', {
    input: z.object({
      data: userSchema
    }),
    async resolve({ ctx, input }) {
      const { data } = input

      const user = await ctx.prisma.user.create({
        data
      })

      return user
    }
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      data: userSchema
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input

      const user = await ctx.prisma.user.update({
        where: { id },
        data
      })

      return user
    }
  })
  .mutation('delete', {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      const { id } = input

      await ctx.prisma.user.delete({ where: { id } })

      return { id }
    }
  })
