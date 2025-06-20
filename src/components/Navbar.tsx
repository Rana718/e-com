"use client"

import React, { useState } from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { Button } from './ui/button'
import { Menu, X, Home, Heart, User, ShoppingBag } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false)
    const { data: session, status } = useSession()
    const pathname = usePathname()

    const navigationItems = [
        { name: 'Dashboard', href: '/dashboard', icon: Home },
        { name: 'Products', href: '/products', icon: ShoppingBag },
        { name: 'Interests', href: '/interests', icon: Heart },
        { name: 'Profile', href: '/profile', icon: User },
    ]

    const isActive = (href: string) => pathname === href

    if (status === 'loading') {
        return (
            <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="animate-pulse flex space-x-4">
                            <div className="h-8 w-32 bg-gray-300 rounded"></div>
                        </div>
                    </div>
                </div>
            </nav>
        )
    }

    return (
        <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    {/* Logo */}
                    <div className="flex items-center">
                        <Link href="/" className="flex-shrink-0 flex items-center">
                            <ShoppingBag className="h-8 w-8 text-primary mr-2" />
                            <span className="text-xl font-bold text-gray-900 dark:text-white">
                                E-Commerce
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    {session && (
                        <div className="hidden md:flex md:items-center md:space-x-6">
                            {navigationItems.map((item) => {
                                const Icon = item.icon
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={cn(
                                            "flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200",
                                            isActive(item.href)
                                                ? "bg-primary text-primary-foreground"
                                                : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                        )}
                                    >
                                        <Icon className="h-4 w-4 mr-2" />
                                        {item.name}
                                    </Link>
                                )
                            })}

                            
                        </div>
                    )}

                    {/* Authentication Links (Desktop) */}
                    {!session && (
                        <div className="hidden md:flex md:items-center md:space-x-4">
                            <Link
                                href="/signin"
                                className="text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">Sign Up</Button>
                            </Link>
                        </div>
                    )}

                    {/* Mobile menu button */}
                    <div className="md:hidden flex items-center">
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="text-gray-700 dark:text-gray-300 hover:text-primary focus:outline-none focus:text-primary transition-colors"
                        >
                            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation */}
            {isOpen && (
                <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
                    <div className="px-2 pt-2 pb-3 space-y-1">
                        {session ? (
                            <>
                                {/* User Info */}
                                <div className="px-3 py-2 border-b border-gray-200 dark:border-gray-700 mb-2">
                                    <div className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                                        <User className="h-4 w-4 mr-2" />
                                    </div>
                                </div>

                                {/* Navigation Items */}
                                {navigationItems.map((item) => {
                                    const Icon = item.icon
                                    return (
                                        <Link
                                            key={item.href}
                                            href={item.href}
                                            onClick={() => setIsOpen(false)}
                                            className={cn(
                                                "flex items-center px-3 py-2 rounded-md text-base font-medium transition-colors duration-200",
                                                isActive(item.href)
                                                    ? "bg-primary text-primary-foreground"
                                                    : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                                            )}
                                        >
                                            <Icon className="h-5 w-5 mr-3" />
                                            {item.name}
                                        </Link>
                                    )
                                })}
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/signin"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/signup"
                                    onClick={() => setIsOpen(false)}
                                    className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                                >
                                    Sign Up
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </nav>
    )
}

export default Navbar