import NextAuth, { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { prisma } from "./prisma" 
import { compare } from "bcryptjs"

export const authOptions: NextAuthOptions = {
    secret: process.env.NEXTAUTH_SECRET || "fallback-secret-for-development",
    session: { 
        strategy: "jwt" as const,
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                try {
                    const email = credentials?.email as string | undefined
                    const password = credentials?.password as string | undefined

                    if (!email || !password) {
                        console.log("Missing email or password")
                        return null
                    }
                    
                    const user = await prisma.user.findUnique({
                        where: {
                            email: email,
                        }
                    })

                    if (!user) {
                        console.log("User not found")
                        return null
                    }

                    if (!user.password) {
                        console.log("No password set for user")
                        return null
                    }

                    const passwordMatch = await compare(password, user.password)

                    if (!passwordMatch) {
                        console.log("Password mismatch")
                        return null
                    }

                    console.log("User authenticated successfully")
                    return { id: user.id, name: user.name, email: user.email }
                } catch (error) {
                    console.error("Auth error:", error)
                    return null
                }
            },
        })
    ],
    pages: {
        signIn: '/signin',
        error: '/signin',
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id
            }
            return token
        },
        async session({ session, token }) {
            if (session.user) {
                session.user.id = token.id as string
            }
            return session
        },
    },
    debug: process.env.NODE_ENV === 'development',
}

export default NextAuth(authOptions)