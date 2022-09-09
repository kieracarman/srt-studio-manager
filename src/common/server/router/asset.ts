import { createRouter } from './context'
import { z } from 'zod'

export const assetRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.asset.findMany({
        include: {
          location: {
            select: {
              name: true
            }
          }
        }
      })
    }
  })
  .query('getOne', {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      const { id } = input

      const asset = await ctx.prisma.asset.findUnique({
        where: { id }
      })

      if (!asset) {
        throw new Error(`No asset with id: ${id}`)
      }

      return asset
    }
  })
  .mutation('add', {
    input: z.object({
      location: z.string(),
      data: z.object({
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
    }),
    async resolve({ ctx, input }) {
      const asset = ctx.prisma.asset.create({
        data: {
          ...input.data,
          location: { connect: { name: input.location } }
        }
      })

      return asset
    }
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      data: z.object({
        tagNumber: z.string(),
        make: z.string(),
        model: z.string(),
        type: z.string(),
        minimumAccessLevel: z.string(),
        status: z.string(),
        serialNumber: z.string().optional(),
        acquisitionType: z.string().optional(),
        dateInService: z.date().optional(),
        dateOutService: z.date().optional(),
        roomId: z.string().cuid()
      })
    }),
    async resolve({ ctx, input }) {
      const { id, data } = input

      const asset = await ctx.prisma.asset.update({
        where: { id },
        data
      })

      return asset
    }
  })
  .mutation('delete', {
    input: z.object({
      id: z.string()
    }),
    async resolve({ ctx, input }) {
      const { id } = input

      await ctx.prisma.asset.delete({ where: { id } })

      return { id }
    }
  })
