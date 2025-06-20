"use client"
import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle, } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import { motion } from "framer-motion"
import { Mail, Lock } from "lucide-react"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

const Page = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handelSubmit = async () => {
        if (!email || !password) {
            setError("Please provide all fields");
            return;
        }
        
        setIsLoading(true);
        setError('');
        
        try {
            const result = await signIn("credentials", {
                email,
                password,
                redirect: false,
            });
            
            if (result?.error) {
                setError("Invalid email or password");
                toast.error("Invalid email or password");
            } else if (result?.ok) {
                toast.success("Signed in successfully!");
                router.push('/dashboard');
                router.refresh();
            }
        } catch (err) {
            console.error("Sign in error:", err);
            setError("An error occurred during sign in");
            toast.error("An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className='flex justify-center items-center min-h-dvh bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="w-[380px] shadow-lg">                    <CardHeader className="space-y-2">
                        <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
                        <p className="text-sm text-muted-foreground text-center">Please enter your details</p>
                        {error && (
                            <div className="text-sm text-red-500 text-center bg-red-50 p-2 rounded-md">
                                {error}
                            </div>
                        )}
                    </CardHeader>
                    <CardContent>
                        <motion.div
                            style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.2 }}
                        >                            <div className="relative">
                                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type='email'
                                    placeholder='Email'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="pl-10 transition-all hover:border-primary"
                                />
                            </div>                            <div className="relative">
                                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                <Input
                                    type='password'
                                    placeholder='Password'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="pl-10 transition-all hover:border-primary"
                                />
                            </div>                            <Button
                                onClick={() => handelSubmit()}
                                disabled={isLoading}
                                className="bg-primary hover:bg-primary/90 transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                        </motion.div>
                    </CardContent>
                    <CardFooter className='flex flex-col gap-4'>
                        <div className='mt-4 text-sm text-center text-muted-foreground'>
                            Don't have an account?{" "}
                            <Link
                                href="/signup"
                                className="text-primary hover:underline font-medium"
                            >
                                Sign Up
                            </Link>
                        </div>
                    </CardFooter>
                </Card>
            </motion.div>
        </div>
    )
}

export default Page