"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { motion } from "framer-motion"
import { Mail, Lock, User, Github } from "lucide-react"
import { useRouter } from 'next/navigation'
import { trpc } from '@/components/providers/trpc-provider'
import { toast } from 'sonner'

const page = () => {
    const [name, setName] = useState('');
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const signupMutation = trpc.auth.signup.useMutation({
        onSuccess: (data) => {
            toast.success(data.message)
            router.push('/signin');
        },
        onError: (error) => {
            setError(error.message)
            toast.error(error.message)
        }
    })

    const handelSubmit = async () => {
        if (!name || !email || !password) {
            setError("Please fill all the fields");
            return;
        }
          setError('');
        signupMutation.mutate({ name, email, password })
    }
    
    return (
        <div className='flex justify-center items-center min-h-screen bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800 px-4 py-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="w-full max-w-md"
            >
                <Card className="w-full shadow-lg">
                    <CardHeader className="space-y-2 text-center">
                        <CardTitle className="text-2xl sm:text-3xl font-bold">Sign Up</CardTitle>
                        <p className="text-sm sm:text-base text-muted-foreground">Create your account to get started</p>
                        {error && (
                            <div className="text-sm text-red-500 bg-red-50 dark:bg-red-900/20 p-3 rounded-md border border-red-200 dark:border-red-800">
                                {error}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent className="px-4 sm:px-6">
                        <motion.div
                            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <div className="relative">
                                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type='text'
                                    placeholder='Full Name'
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="pl-10 transition-all hover:border-primary focus:border-primary h-11"
                                />
                            </div>
                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type='email'
                                    placeholder='Email Address'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 transition-all hover:border-primary focus:border-primary h-11"
                                />
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type='password'
                                    placeholder='Password (min. 6 characters)'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 transition-all hover:border-primary focus:border-primary h-11"
                                />
                            </div>
                            <Button
                                onClick={() => handelSubmit()}
                                disabled={signupMutation.isPending}
                                className="bg-primary hover:bg-primary/90 transition-colors h-11 text-base font-medium"
                            >
                                {signupMutation.isPending ? (
                                    <motion.div
                                        animate={{ rotate: 360 }}
                                        transition={{ duration: 1, repeat: Infinity }}
                                        className="flex items-center"
                                    >
                                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                                        Creating Account...
                                    </motion.div>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </motion.div>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-4 px-4 sm:px-6'>
                        <div className='text-sm text-center text-muted-foreground'>
                            Already have an account?{" "}
                            <Link
                                href="/signin"
                                className="text-primary hover:underline font-medium transition-colors"
                            >
                                Sign in here
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}

export default page