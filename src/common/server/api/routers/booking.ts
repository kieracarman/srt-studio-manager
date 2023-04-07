import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'

const bookingSchema = z.object({
  title: z.string(),
  bookingDate: z.date(),
  status: z.string().optional(),
  approvedDate: z.date().optional()
})

export const bookingRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.booking.findMany({
      include: {
        room: true,
        createdBy: true
      }
    })
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const booking = await ctx.prisma.booking.findUnique({
        where: { id },
        include: {
          room: true,
          createdBy: true,
          assets: true
        }
      })

      if (!booking) throw new Error(`No booking with id: ${id}`)

      return booking
    }),

  add: publicProcedure
    .input(
      z.object({
        createdBy: z.string().cuid().optional(),
        room: z.string().cuid(),
        assets: z.array(z.string().cuid()).optional(),
        data: bookingSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { createdBy, room, assets, data } = input

      const booking = await ctx.prisma.booking.create({
        data: {
          ...data,
          createdBy: { connect: { id: createdBy } },
          room: { connect: { id: room } },
          assets: { connect: assets?.map((id) => ({ id })) }
        }
      })

      return booking
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        createdBy: z.string().cuid().optional(),
        room: z.string().cuid(),
        assets: z.array(z.string().cuid()).optional(),
        data: bookingSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, createdBy, room, assets, data } = input

      const booking = await ctx.prisma.booking.update({
        where: { id },
        data: {
          ...data,
          createdBy: { connect: { id: createdBy } },
          room: { connect: { id: room } },
          assets: { connect: assets?.map((id) => ({ id })) }
        }
      })

      return booking
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      await ctx.prisma.booking.delete({ where: { id } })

      return { id }
    })
})
