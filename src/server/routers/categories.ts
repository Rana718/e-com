import { z } from 'zod'
import { TRPCError } from '@trpc/server'
import { publicProcedure, protectedProcedure, router } from '../trpc'

const listCategoriesSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(6),
})

const saveUserInterestsSchema = z.object({
  categoryIds: z.array(z.string()).min(0),
})

export const categoriesRouter = router({
  list: publicProcedure
    .input(listCategoriesSchema)
    .query(async ({ input, ctx }) => {
      const { page, limit } = input
      const skip = (page - 1) * limit

      const [categories, total] = await Promise.all([
        ctx.prisma.category.findMany({
          skip,
          take: limit,
          orderBy: { name: 'asc' },
          select: {
            id: true,
            name: true,
          },
        }),
        ctx.prisma.category.count(),
      ])

      const totalPages = Math.ceil(total / limit)
      const hasNextPage = page < totalPages
      const hasPreviousPage = page > 1

      return {
        categories,
        pagination: {
          page,
          limit,
          total,
          totalPages,
          hasNextPage,
          hasPreviousPage,
        },
      }
    }),

  getUserInterests: protectedProcedure
    .query(async ({ ctx }) => {
      if (!ctx.user?.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }

      const user = await ctx.prisma.user.findUnique({
        where: { id: ctx.user.id },
        include: {
          interests: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      if (!user) {
        throw new TRPCError({
          code: 'NOT_FOUND',
          message: 'User not found',
        })
      }

      return {
        interests: user.interests,
      }
    }),

  saveUserInterests: protectedProcedure
    .input(saveUserInterestsSchema)
    .mutation(async ({ input, ctx }) => {
      const { categoryIds } = input
      
      if (!ctx.user?.id) {
        throw new TRPCError({
          code: 'UNAUTHORIZED',
          message: 'User not authenticated',
        })
      }

      // Verify all category IDs exist
      const existingCategories = await ctx.prisma.category.findMany({
        where: {
          id: { in: categoryIds },
        },
        select: { id: true },
      })

      const existingCategoryIds = existingCategories.map(cat => cat.id)
      const invalidIds = categoryIds.filter(id => !existingCategoryIds.includes(id))

      if (invalidIds.length > 0) {
        throw new TRPCError({
          code: 'BAD_REQUEST',
          message: `Invalid category IDs: ${invalidIds.join(', ')}`,
        })
      }

      // Update user interests
      const user = await ctx.prisma.user.update({
        where: { id: ctx.user.id },
        data: {
          interests: {
            set: categoryIds.map(id => ({ id })),
          },
        },
        include: {
          interests: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      })

      return {
        success: true,
        message: 'Interests updated successfully',
        interests: user.interests,
      }
    }),
})
