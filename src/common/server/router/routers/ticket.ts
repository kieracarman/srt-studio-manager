import { createRouter } from '../context'
import { z } from 'zod'

const ticketSchema = z.object({
  title: z.string(),
  text: z.string(),
  status: z.string(),
  assignedRole: z.string()
})

export const ticketRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.ticket.findMany({
        include: {
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

      const ticket = await ctx.prisma.ticket.findUnique({
        where: { id },
        include: {
          createdBy: true,
          asset: true
        }
      })

      if (!ticket) {
        throw new Error(`No ticket with id: ${id}`)
      }

      return ticket
    }
  })
  .mutation('add', {
    input: z.object({
      createdBy: z.string().cuid(),
      asset: z.string().cuid(),
      data: ticketSchema
    }),
    async resolve({ ctx, input }) {
      const { createdBy, asset, data } = input

      const ticket = await ctx.prisma.ticket.create({
        data: {
          ...data,
          createdBy: { connect: { id: createdBy } },
          asset: { connect: { id: asset } }
        }
      })

      return ticket
    }
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      createdBy: z.string().cuid(),
      asset: z.string().cuid(),
      data: ticketSchema
    }),
    async resolve({ ctx, input }) {
      const { id, createdBy, asset, data } = input

      const ticket = await ctx.prisma.ticket.update({
        where: { id },
        data: {
          ...data,
          createdBy: { connect: { id: createdBy } },
          asset: { connect: { id: asset } }
        }
      })

      return ticket
    }
  })
  .mutation('delete', {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      const { id } = input

      await ctx.prisma.ticket.delete({ where: { id } })

      return { id }
    }
  })
