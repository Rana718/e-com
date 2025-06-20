"use client"
import { useSession } from 'next-auth/react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { 
  User, 
  ShoppingBag, 
  Heart, 
  TrendingUp, 
  Package, 
  Star,
  ArrowRight,
  Activity,
  Calendar,
  Target,
  Gift,
  MessageSquare,
  Bell
} from "lucide-react"
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import Link from 'next/link'
import { trpc } from '@/components/providers/trpc-provider'

export default function Dashboard() {
    const { data: session, status } = useSession()
    const router = useRouter()

    // Fetch user interests
    const { data: userInterests } = trpc.categories.getUserInterests.useQuery(
      undefined,
      { enabled: !!session?.user }
    )

    useEffect(() => {
        if (status === 'unauthenticated') {
            router.push('/signin')
        }
    }, [status, router])

    if (status === 'loading') {
        return (
            <div className="flex justify-center items-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            </div>
        )
    }

    if (!session) {
        return null
    }

    // Mock data for demonstration
    const stats = [
        {
            title: "Total Orders",
            value: "24",
            change: "+12%",
            icon: ShoppingBag,
            color: "text-blue-600"
        },
        {
            title: "Wishlist Items",
            value: userInterests?.interests?.length?.toString() || "0",
            change: "+5%",
            icon: Heart,
            color: "text-pink-600"
        },
        {
            title: "Total Spent",
            value: "$1,245",
            change: "+18%",
            icon: TrendingUp,
            color: "text-green-600"
        },
        {
            title: "Saved Items",
            value: "18",
            change: "+3%",
            icon: Star,
            color: "text-yellow-600"
        }
    ]

    const recentActivity = [
        {
            action: "Placed order",
            item: "Wireless Headphones",
            time: "2 hours ago",
            status: "completed"
        },
        {
            action: "Added to wishlist",
            item: "Smart Watch",
            time: "1 day ago",
            status: "pending"
        },
        {
            action: "Left review",
            item: "Coffee Maker",
            time: "3 days ago",
            status: "completed"
        }
    ]

    const quickActions = [
        {
            title: "Manage Interests",
            description: "Update your product interests and preferences",
            icon: Heart,
            href: "/interests",
            color: "bg-pink-50 text-pink-600 border-pink-200"
        },
        {
            title: "Browse Products",
            description: "Discover new products based on your interests",
            icon: Package,
            href: "/products",
            color: "bg-blue-50 text-blue-600 border-blue-200"
        },
        {
            title: "Order History",
            description: "View and track your past orders",
            icon: Calendar,
            href: "/orders",
            color: "bg-green-50 text-green-600 border-green-200"
        },
        {
            title: "Profile Settings",
            description: "Update your account information",
            icon: User,
            href: "/profile",
            color: "bg-purple-50 text-purple-600 border-purple-200"
        }
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 py-6 lg:py-8">
                {/* Welcome Header */}
                <div className="mb-8">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                                Welcome back, {session.user?.name?.split(' ')[0] || 'User'}!
                            </h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                Here's what's happening with your account today.
                            </p>
                        </div>
                        <div className="mt-4 sm:mt-0 flex items-center space-x-2">
                            <Badge variant="secondary" className="px-3 py-1">
                                <Activity className="h-3 w-3 mr-1" />
                                Active
                            </Badge>
                            <Button variant="outline" size="sm">
                                <Bell className="h-4 w-4 mr-2" />
                                Notifications
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                    {stats.map((stat, index) => {
                        const Icon = stat.icon
                        return (
                            <Card key={index} className="hover:shadow-md transition-shadow">
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                                                {stat.title}
                                            </p>
                                            <p className="text-2xl font-bold text-gray-900 dark:text-white">
                                                {stat.value}
                                            </p>
                                            <p className={`text-xs ${stat.color} font-medium`}>
                                                {stat.change} from last month
                                            </p>
                                        </div>
                                        <div className={`p-2 rounded-lg bg-gray-50 dark:bg-gray-800`}>
                                            <Icon className={`h-5 w-5 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        )
                    })}
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    {/* Quick Actions */}
                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Target className="h-5 w-5 mr-2" />
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {quickActions.map((action, index) => {
                                        const Icon = action.icon
                                        return (
                                            <Link key={index} href={action.href}>
                                                <div className={`p-4 rounded-lg border cursor-pointer hover:shadow-md transition-all ${action.color} hover:scale-105`}>
                                                    <div className="flex items-start justify-between">
                                                        <div className="flex-1">
                                                            <h3 className="font-semibold mb-1">
                                                                {action.title}
                                                            </h3>
                                                            <p className="text-sm opacity-80">
                                                                {action.description}
                                                            </p>
                                                        </div>
                                                        <Icon className="h-5 w-5 ml-2 flex-shrink-0" />
                                                    </div>
                                                    <div className="mt-3 flex items-center text-sm font-medium">
                                                        Get started
                                                        <ArrowRight className="h-3 w-3 ml-1" />
                                                    </div>
                                                </div>
                                            </Link>
                                        )
                                    })}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* User Profile Card */}
                    <div>
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <User className="h-5 w-5 mr-2" />
                                    Profile Overview
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <User className="h-8 w-8 text-primary" />
                                    </div>
                                    <h3 className="font-semibold text-lg mb-1">
                                        {session.user?.name}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                                        {session.user?.email}
                                    </p>
                                    <div className="space-y-2">
                                        <div className="text-sm">
                                            <span className="font-medium">Member since:</span>
                                            <span className="text-gray-600 dark:text-gray-400 ml-1">
                                                Jan 2024
                                            </span>
                                        </div>
                                        <div className="text-sm">
                                            <span className="font-medium">Interests:</span>
                                            <span className="text-gray-600 dark:text-gray-400 ml-1">
                                                {userInterests?.interests?.length || 0} categories
                                            </span>
                                        </div>
                                    </div>
                                    <Link href="/profile">
                                        <Button variant="outline" size="sm" className="mt-4 w-full">
                                            Edit Profile
                                        </Button>
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Recent Activity & Recommendations */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Recent Activity */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Activity className="h-5 w-5 mr-2" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recentActivity.map((activity, index) => (
                                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                                        <div className="flex-1">
                                            <p className="font-medium text-sm">
                                                {activity.action}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                {activity.item}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">
                                                {activity.time}
                                            </p>
                                            <Badge 
                                                variant={activity.status === 'completed' ? 'default' : 'secondary'}
                                                className="text-xs"
                                            >
                                                {activity.status}
                                            </Badge>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <Button variant="ghost" size="sm" className="w-full mt-4">
                                View All Activity
                                <ArrowRight className="h-3 w-3 ml-1" />
                            </Button>
                        </CardContent>
                    </Card>

                    {/* Recommendations */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Gift className="h-5 w-5 mr-2" />
                                Recommended for You
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                                        <Package className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Premium Electronics</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            Based on your interests
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex items-center space-x-3 p-3 bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 rounded-lg">
                                    <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-teal-500 rounded-lg flex items-center justify-center">
                                        <Heart className="h-6 w-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="font-medium">Lifestyle Products</h4>
                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                            New arrivals for you
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <Link href="/products">
                                <Button size="sm" className="w-full mt-4">
                                    Browse All Products
                                    <ArrowRight className="h-3 w-3 ml-2" />
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
