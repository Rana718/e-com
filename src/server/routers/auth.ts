import { z } from 'zod'
import { router, publicProcedure } from '../trpc'
import { hash, compare } from 'bcryptjs'
import { TRPCError } from '@trpc/server'

const signupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email format"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

const loginSchema = z.object({
  email: z.string().email("Invalid email format"),
  password: z.string().min(1, "Password is required"),
})

export const authRouter = router({
  signup: publicProcedure
    .input(signupSchema)
    .mutation(async ({ input, ctx }) => {
      console.log('Signup mutation called with:', input.email)
      const { name, email, password } = input

      try {
        // Check if user already exists
        const existingUser = await ctx.prisma.user.findUnique({
          where: { email }
        })

        if (existingUser) {
          throw new TRPCError({
            code: 'CONFLICT',
            message: 'User already exists with this email',
          })
        }

        // Hash password
        const hashedPassword = await hash(password, 12)

        // Create user
        const user = await ctx.prisma.user.create({
          data: {
            name,
            email,
            password: hashedPassword
          },
          select: {
            id: true,
            name: true,
            email: true,
            createdAt: true
          }
        })

        console.log('User created successfully:', user.email)
        return {
          message: "User created successfully",
          user
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error
        }
        
        console.error('Signup error:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong during signup',
        })
      }
    }),

  login: publicProcedure
    .input(loginSchema)
    .mutation(async ({ input, ctx }) => {
      const { email, password } = input

      try {
        // Find user by email
        const user = await ctx.prisma.user.findUnique({
          where: { email }
        })

        if (!user) {
          throw new TRPCError({
            code: 'NOT_FOUND',
            message: 'User not found',
          })
        }

        if (!user.password) {
          throw new TRPCError({
            code: 'BAD_REQUEST',
            message: 'Password not set for this user',
          })
        }

        // Verify password
        const passwordMatch = await compare(password, user.password)

        if (!passwordMatch) {
          throw new TRPCError({
            code: 'UNAUTHORIZED',
            message: 'Invalid password',
          })
        }

        return {
          message: "Login successful",
          user: {
            id: user.id,
            name: user.name,
            email: user.email
          }
        }
      } catch (error) {
        if (error instanceof TRPCError) {
          throw error
        }
        
        console.error('Login error:', error)
        throw new TRPCError({
          code: 'INTERNAL_SERVER_ERROR',
          message: 'Something went wrong during login',
        })
      }
    }),
})
