import { createRouter } from '../context'
import { z } from 'zod'

const bookingSchema = z.object({
  title: z.string(),
  bookingDate: z.date(),
  status: z.string().optional(),
  approvedDate: z.date().optional()
})

export const bookingRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.booking.findMany({
        include: {
          room: true,
          createdBy: true
        }
      })
    }
  })
  .query('getOne', {
    input: z.object({
      id: z.string().cuid()
    }),
    async resolve({ ctx, input }) {
      const { id } = input

      const booking = await ctx.prisma.booking.findUnique({
        where: { id },
        include: {
          room: true,
          createdBy: true,
          assets: true
        }
      })

      if (!booking) {
        throw new Error(`No booking with id: ${id}`)
      }

      return booking
    }
  })
  .mutation('add', {
    input: z.object({
      createdBy: z.string().cuid().optional(),
      room: z.string().cuid(),
      assets: z.array(z.string().cuid()).optional(),
      data: bookingSchema
    }),
    async resolve({ ctx, input }) {
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
    }
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      createdBy: z.string().cuid().optional(),
      room: z.string().cuid(),
      assets: z.array(z.string().cuid()).optional(),
      data: bookingSchema
    }),
    async resolve({ ctx, input }) {
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
    }
  })
  .mutation('delete', {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      const { id } = input

      await ctx.prisma.booking.delete({ where: { id } })

      return { id }
    }
  })
