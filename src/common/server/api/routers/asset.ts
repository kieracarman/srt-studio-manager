import { z } from 'zod'

import { createTRPCRouter, publicProcedure } from '@server/api/trpc'

const assetSchema = z.object({
  tagNumber: z.string(),
  description: z.string(),
  make: z.string(),
  model: z.string(),
  type: z.string(),
  minimumAccessLevel: z.string(),
  status: z.string(),
  serialNumber: z.string().optional(),
  acquisitionType: z.string().optional(),
  dateInService: z.date().optional(),
  dateOutService: z.date().optional()
})

export const assetRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.asset.findMany({
      include: {
        location: true
      }
    })
  }),

  getOne: publicProcedure
    .input(z.object({ id: z.string().cuid() }))
    .query(async ({ ctx, input }) => {
      const { id } = input

      const asset = await ctx.prisma.asset.findUnique({
        where: { id },
        include: {
          location: true
        }
      })

      if (!asset) throw new Error(`No asset with id: ${id}`)

      return asset
    }),

  add: publicProcedure
    .input(
      z.object({
        location: z.string(),
        data: assetSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const asset = await ctx.prisma.asset.create({
        data: {
          ...input.data,
          location: { connect: { id: input.location } }
        }
      })

      return asset
    }),

  edit: publicProcedure
    .input(
      z.object({
        id: z.string().cuid(),
        location: z.string().cuid(),
        data: assetSchema
      })
    )
    .mutation(async ({ ctx, input }) => {
      const { id, location, data } = input

      const asset = await ctx.prisma.asset.update({
        where: { id },
        data: {
          ...data,
          location: { connect: { id: location } }
        }
      })

      return asset
    }),

  delete: publicProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const { id } = input

      await ctx.prisma.asset.delete({ where: { id } })

      return { id }
    })
})
