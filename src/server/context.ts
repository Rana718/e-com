import { NextRequest } from 'next/server'
import { prisma } from '@/prisma'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/auth'

export async function createContext(opts?: { req?: NextRequest }) {
  // In App Router, getServerSession() without parameters works in server components and API routes
  const session = await getServerSession(authOptions)
  
  return {
    prisma,
    session,
    user: session?.user || null,
    req: opts?.req,
  }
}

export type Context = Awaited<ReturnType<typeof createContext>>
