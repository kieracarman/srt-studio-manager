import { z } from 'zod'

import { createTRPCRouter, protectedProcedure } from '@server/api/trpc'

const userSchema = z.object({
  email: z.string().email().nullable().optional(),
  role: z.string(),
  accessLevel: z.string()
})

export const userRouter = createTRPCRouter({
  getCurrentRole: protectedProcedure.query(async ({ ctx }) => {
    const userResponse = await ctx.prisma.user.findFirst({
      where: { id: ctx.session.user.id },
      select: { role: true }
    })

    return userResponse?.role
  }),

  getAll: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany()
  }),

  getOne: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid()
      })
    )
    .query(async ({ ctx, input }) => {
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

      if (!user) throw new Error(`No user with id: ${id}`)

      return user
    }),

  add: protectedProcedure
    .input(
      z.object({
        data: userSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { data } = input

      const user = await ctx.prisma.user.create({
        data
      })

      return user
    }),

  edit: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        data: userSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, data } = input

      const user = await ctx.prisma.user.update({
        where: { id },
        data
      })

      return user
    }),

  delete: protectedProcedure
    .input(
      z.object({
        id: z.string().cuid()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      await ctx.prisma.user.delete({ where: { id } })

      return { id }
    })
})
