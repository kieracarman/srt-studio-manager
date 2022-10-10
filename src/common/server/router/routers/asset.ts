import { createRouter } from '../context'
import { z } from 'zod'

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

export const assetRouter = createRouter()
  .query('getAll', {
    async resolve({ ctx }) {
      return await ctx.prisma.asset.findMany({
        include: {
          location: true
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

      const asset = await ctx.prisma.asset.findUnique({
        where: { id },
        include: {
          location: true
        }
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
      data: assetSchema
    }),
    async resolve({ ctx, input }) {
      const asset = ctx.prisma.asset.create({
        data: {
          ...input.data,
          location: { connect: { id: input.location } }
        }
      })

      return asset
    }
  })
  .mutation('edit', {
    input: z.object({
      id: z.string().cuid(),
      location: z.string().cuid(),
      data: assetSchema
    }),
    async resolve({ ctx, input }) {
      const { id, location, data } = input

      const asset = await ctx.prisma.asset.update({
        where: { id },
        data: {
          ...data,
          location: { connect: { id: location } }
        }
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
