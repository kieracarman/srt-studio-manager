import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'

const ticketSchema = z.object({
  title: z.string(),
  text: z.string(),
  status: z.string(),
  assignedRole: z.string()
})

export const ticketRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.ticket.findMany({
      include: {
        createdBy: true
      }
    })
  }),

  getOne: publicProcedure
    .input(
      z.object({
        id: z.string().cuid()
      })
    )
    .query(async ({ ctx, input }) => {
      const { id } = input

      const ticket = await ctx.prisma.ticket.findUnique({
        where: { id },
        include: {
          createdBy: true,
          asset: true
        }
      })

      if (!ticket) throw new Error(`No ticket with id: ${id}`)

      return ticket
    }),

  add: publicProcedure
    .input(
      z.object({
        createdBy: z.string().cuid().optional(),
        asset: z.string().cuid().optional(),
        data: ticketSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { createdBy, asset, data } = input

      const ticket = await ctx.prisma.ticket.create({
        data: {
          ...data,
          createdBy: { connect: { id: createdBy } },
          asset: { connect: { id: asset } }
        }
      })

      return ticket
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        createdBy: z.string().cuid().optional(),
        asset: z.string().cuid().optional(),
        data: ticketSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
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
    }),

  delete: publicProcedure
    .input(
      z.object({
        id: z.string()
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      await ctx.prisma.ticket.delete({ where: { id } })

      return { id }
    })
})
